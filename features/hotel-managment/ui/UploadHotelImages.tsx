"use client";
import React, { useState } from "react";
import { Upload, message, Button } from "antd";
import type { UploadProps, UploadFile } from "antd";
import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useUploadImagesMutation } from "@/entities/Hotel/services/hotel.service";

function UploadHotelImages({ slug }: { slug: string }) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadImages, { isLoading }] = useUploadImagesMutation();

  const props: UploadProps = {
    accept: "image/*",
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("فقط فایل‌های تصویری مجاز هستند.");
        return Upload.LIST_IGNORE;
      }

      const newFile: UploadFile = {
        uid: file.name + Date.now(),
        name: file.name,
        status: "done",
        originFileObj: file,
      };

      setFileList((prev) => [...prev, newFile]);
      return Upload.LIST_IGNORE;
    },
    onChange: ({ fileList }) => {
      setFileList(fileList);
    },
    onRemove: (file) => {
      setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
      return true;
    },
    multiple: true,
    showUploadList: {
      showRemoveIcon: true,
      showPreviewIcon: false,
    },
  };

  const handleUpload = async () => {
    const validFiles = fileList.filter((f) => f.originFileObj instanceof File);
    if (validFiles.length === 0) {
      message.warning("لطفاً ابتدا فایل‌های تصویری را انتخاب کنید.");
      return;
    }

    try {
      // آپلود همه فایل‌ها (مثلاً به صورت پشت‌سرهم)
      for (const fileObj of validFiles) {
        const file = fileObj.originFileObj as File;
        await uploadImages({ slug, file }).unwrap();
      }
      toast.success("گالری با موفقیت آپلود شد.");
      setFileList([]);
    } catch (error: any) {
      toast.error(error?.data?.message || "خطا در آپلود گالری.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Upload.Dragger
        multiple
        {...props}
        className="w-full h-64 border-2 border-dashed border-blue-200 rounded-xl hover:border-blue-400 transition-colors"
      >
        <div className="flex flex-col items-center justify-center gap-2 text-blue-600">
          <CloudUploadOutlined style={{ fontSize: 48, marginBottom: 8 }} />
          <p className="text-sm font-medium">
            تصاویر را اینجا بکشید یا کلیک کنید
          </p>
          <p className="text-xs text-gray-500">
            فرمت‌های پشتیبانی شده: JPG, PNG, WEBP
          </p>
          <p className="text-xs text-gray-400">حداکثر حجم: ۲ مگابایت</p>
        </div>
      </Upload.Dragger>

      <Button
        type="primary"
        icon={<UploadOutlined />}
        loading={isLoading}
        onClick={handleUpload}
        disabled={fileList.length === 0 || isLoading}
        size="middle"
      >
        آپلود گالری
      </Button>
    </div>
  );
}

export default UploadHotelImages;

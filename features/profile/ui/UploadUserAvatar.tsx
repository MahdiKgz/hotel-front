"use client";
import { Upload, message, Button } from "antd";
import type { UploadProps, UploadFile } from "antd";
import React, { useState } from "react";
import { CloudUploadOutlined, UploadOutlined } from "@ant-design/icons";
import { useUploadAvatarMutation } from "@/entities/User/services/auth.service";
import { toast } from "react-toastify";

function UploadUserAvatar() {
  // تغییر نوع fileList به File[] برای دسترسی مستقیم به فایل اصلی
  const [fileList, setFileList] = useState<File[]>([]);
  const [uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  const props: UploadProps = {
    accept: "image/*",
    fileList: fileList as UploadFile[], // ترکیب نوع برای سازگاری با Upload.Dragger
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("فقط فایل‌های تصویری مجاز هستند.");
        return Upload.LIST_IGNORE;
      }

      setFileList([file]); // فقط فایل خالص ذخیره می‌شود
      return Upload.LIST_IGNORE;
    },
    onChange: ({ fileList }) => {
      // فیلتر کردن فقط فایل‌های واقعی (UploadFile بدون originFileObj را حذف کنیم)
      const validFiles = fileList
        .filter((f) => "originFileObj" in f && f.originFileObj instanceof File)
        .map((f) => f.originFileObj as File);
      setFileList(validFiles);
    },
    onRemove: () => {
      setFileList([]);
      return true;
    },
    multiple: false,
    showUploadList: {
      showRemoveIcon: true,
      showPreviewIcon: false,
    },
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning("لطفاً ابتدا یک فایل انتخاب کنید.");
      return;
    }

    const previewFile = fileList[0]; // الان از File[] است، پس undefined نیست
    console.log("✅ File:", previewFile);

    try {
      await uploadAvatar(previewFile).unwrap();
      toast.success("آواتار با موفقیت آپلود شد.");
      setFileList([]);
      return;
    } catch (error: any) {
      toast.error(error?.data?.message || "خطا در آپلود آواتار.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Upload.Dragger
        {...props}
        className="w-full h-64 border-2 border-dashed border-blue-200 rounded-xl hover:border-blue-400 transition-colors"
      >
        <div className="flex flex-col items-center justify-center gap-2 text-blue-600">
          <CloudUploadOutlined style={{ fontSize: 48, marginBottom: 8 }} />
          <p className="text-sm font-medium">
            تصویر را اینجا بکشید یا کلیک کنید
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
        آپلود
      </Button>
    </div>
  );
}

export default UploadUserAvatar;

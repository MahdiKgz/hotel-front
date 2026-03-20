import { roles } from "@/constants/users.constant";
import { useGetOneUserQuery } from "@/entities/User/services/auth.service";
import { Descriptions, Modal, Tag } from "antd";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

interface UserInformationModalProps {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function UserInformationModal({
  id,
  open,
  setOpen,
}: UserInformationModalProps) {
  const { data: user } = useGetOneUserQuery(id, { refetchOnFocus: true });

  const formattedUser = user?.data?.user;

  if (!id || !formattedUser) return;
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(() => false)}
      title="اطلاعات کامل کاربر"
      width={1000}
      footer={null}
    >
      <Descriptions bordered>
        <Descriptions.Item label="نام کامل">
          {formattedUser.full_name || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="ایمیل">
          {formattedUser.email || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="شماره تماس">
          {formattedUser.phone || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="ایمیل">
          {formattedUser.email || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="توضیحات">
          {formattedUser.bio || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}

export default UserInformationModal;

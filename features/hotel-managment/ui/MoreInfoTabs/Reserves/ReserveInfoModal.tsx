import { Reserve } from "@/features/hotel-managment/types/hotel.types";
import { Descriptions, Modal, Tag } from "antd";
import React, { Dispatch, SetStateAction } from "react";

interface ReserveInfoModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reserve: Reserve;
}

function ReserveInfoModal({ open, setOpen, reserve }: ReserveInfoModalProps) {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(() => false)}
      width={1000}
      footer={null}
      title={`اطلاعات ررزو ${reserve?.room?.name}`}
    >
      <Descriptions bordered>
        <Descriptions.Item label="نام اتاق">
          {reserve?.room?.name}
        </Descriptions.Item>
        <Descriptions.Item label="تاریخ شروع">
          {new Date(reserve?.startDate).toLocaleDateString("fa-IR")}
        </Descriptions.Item>
        <Descriptions.Item label="تاریخ پایان">
          {new Date(reserve?.endDate).toLocaleDateString("fa-IR")}
        </Descriptions.Item>
        <Descriptions.Item label="رزرو شده توسط">
          {reserve?.user?.fullName}
        </Descriptions.Item>

        <Descriptions.Item label="شماره تماس">
          {reserve?.user?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="وصعیت رزرو">
          <Tag color="green">معتبر</Tag>
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}

export default ReserveInfoModal;

import React from "react";
import { Room } from "../../types/room.types";
import { Descriptions, Tag } from "antd";
import {
  BOOK_TYPE_MAP,
  GEO_DIRECTION_MAP,
  KITCHEN_MAP,
} from "@/constants/hotel.constant";

function RoomGeneral({ room }: { room: Room }) {
  return (
    <div className="w-full my-4">
      <Descriptions bordered>
        <Descriptions.Item label="نام">
          {room?.name || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="نام اختصاری">
          {room?.slug || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="ظرفیت">
          {`${room?.capacity} نفر` || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="قیمت">
          {`${room?.price} تومان` || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="وضعیت">
          {room?.status === "EMPTY" ? (
            <Tag color="blue">قابل رزرو</Tag>
          ) : room?.status === "MAINTAIN" ? (
            <Tag color="cyan">در حال تعمیر</Tag>
          ) : (
            <Tag color="red">رزرو شده</Tag> || <Tag color="red">ثبت نشده</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="وضعیت آشپزخانه">
          {(
            <Tag color={room?.kitchen === "YES" ? "green" : "red"}>
              {KITCHEN_MAP[room?.kitchen]}
            </Tag>
          ) || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="تعداد سرویس بهداشتی">
          {room?.bathService || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="تعداد بالکن">
          {room?.balcony || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="جهت جغرافیایی">
          {GEO_DIRECTION_MAP[room?.geoDirection] || (
            <Tag color="red">ثبت نشده</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="نوع رزرو">
          {BOOK_TYPE_MAP[room?.bookType] || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="هتل">
          {room?.hotel?.name || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="توضیحات">
          {room?.description || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default RoomGeneral;

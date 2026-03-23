"use client";
import React from "react";
import { useGetOneHotelQuery } from "@/entities/Hotel/services/hotel.service";
import { Descriptions, Tag } from "antd";
import { Hotel } from "../types/hotel.types";
import { METRO_ACCESS_MAP, STARS_COUNT_MAP } from "@/constants/hotel.constant";

function General({ slug }: { slug: string }) {
  const { data: oneHotelResponse } = useGetOneHotelQuery(slug, {
    refetchOnFocus: true,
  });

  const rawHotel: Hotel = oneHotelResponse?.data.hotel;

  return (
    <div className="w-full h-full my-4">
      <Descriptions bordered>
        <Descriptions.Item label="عنوان">
          {rawHotel?.name || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="نام مسئول">
          {rawHotel?.manager?.full_name || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="علامت اختصاری">
          {rawHotel?.slug || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="کد پستی">
          {rawHotel?.postalCode || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>

        <Descriptions.Item label="دسترسی به مترو">
          {METRO_ACCESS_MAP[rawHotel?.metroAccess] || (
            <Tag color="red">ثبت نشده</Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="تعداد ستاره">
          {STARS_COUNT_MAP[rawHotel?.stars] || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="آدرس">
          {rawHotel?.address || <Tag color="red">ثبت نشده</Tag>}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default General;

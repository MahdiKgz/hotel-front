"use client";
import React, { useMemo } from "react";
import { roles } from "@/constants/users.constant";
import { useGetAllUsersQuery } from "@/entities/User/services/auth.service";
import { Table, Tag } from "antd";
import UserRowActions from "./UserRowActions";

function UsersList() {
  const columns = useMemo(
    () => [
      {
        title: "نام کامل",
        dataIndex: "full_name",
        key: "full_name",
      },
      {
        title: "شماره تماس",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "ایمیل",
        dataIndex: "email",
        key: "email",
        render: (_: unknown, { email }: { email: string | null }) => (
          <>{email ? email : <Tag color="red">ثبت نشده</Tag>}</>
        ),
      },
      {
        title: "نقش",
        dataIndex: "role",
        key: "role",
        render: (_: unknown, { role }: { role: string }) => (
          <>
            {role === "ADMIN" ? (
              <Tag color="green">{roles[role]}</Tag>
            ) : (
              // @ts-expect-error some errors
              <Tag color="blue">{roles[role]}</Tag>
            )}
          </>
        ),
      },

      {
        title: "عملیات",
        key: "actions",
        render: (_: unknown, record: { id: number }) => (
          <UserRowActions id={record.id} />
        ),
      },
    ],
    [],
  );

  const { data: users } = useGetAllUsersQuery("", { refetchOnFocus: true });
  return (
    <Table
      // @ts-expect-error some errors

      columns={columns}
      dataSource={users?.data.users}
      pagination={{ pageSize: 10 }}
      scroll={{ x: "max-content" }}
      rowKey="id"
      className="w-full"
    />
  );
}

export default UsersList;

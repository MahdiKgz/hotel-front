"use client";
import React from "react";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { RootState } from "@/shared/configs/store";
import { useGetMeQuery } from "@/entities/User/services/auth.service";

function UserAvatar() {
  useGetMeQuery("", { refetchOnFocus: true });
  const profile = useSelector((state: RootState) => state.profile);

  const avatarUrl = "http://localhost:4000/" + profile.avatar || undefined;
  const fallbackName =
    profile.fullName?.split(" ").slice(0, 2).join(" ") || "U";

  return (
    <div className="flex items-center gap-3">
      <Avatar
        size={40}
        src={avatarUrl}
        alt={profile.fullName || "کاربر"}
        style={{ backgroundColor: "#1677ff" }}
      >
        {fallbackName}
      </Avatar>
      <h1 className="font-bold text-sm">{profile.fullName}</h1>
    </div>
  );
}

export default UserAvatar;

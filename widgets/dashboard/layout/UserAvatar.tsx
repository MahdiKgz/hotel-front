"use client";

import { useSelector } from "react-redux";
import { Avatar } from "antd";
import { RootState } from "@/shared/configs/store";
import { useGetMeQuery } from "@/entities/User/services/auth.service";
import { getApiAssetUrl } from "@/shared/configs/api";

export default function UserAvatar() {
  useGetMeQuery("", { refetchOnFocus: true });
  const profile = useSelector((state: RootState) => state.profile);
  const avatarUrl = getApiAssetUrl(profile.avatar);
  const fallbackName = profile.fullName?.trim().slice(0, 1) || "ه";

  return (
    <div className="dashboard-user">
      <Avatar size={42} src={avatarUrl} alt={profile.fullName || "کاربر"}>
        {fallbackName}
      </Avatar>
      <div>
        <strong>{profile.fullName || "کاربر هُما"}</strong>
        <small>{profile.role === "ADMIN" ? "مدیر سامانه" : "مسافر هُما"}</small>
      </div>
    </div>
  );
}

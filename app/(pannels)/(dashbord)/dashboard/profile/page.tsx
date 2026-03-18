"use client";
import React, { useState } from "react";
import ProfileForm from "@/features/profile/ui/ProfileForm";
import UploadUserAvatar from "@/features/profile/ui/UploadUserAvatar";
import ResetPasswordModal from "@/features/profile/ui/ResetPasswordModal";
import { Button } from "antd";

function ProfilePage() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex flex-col items-start gap-6">
      <h1 className="font-bold text-xl">پروفایل کاربری</h1>
      <ResetPasswordModal open={open} setOpen={setOpen} />
      <UploadUserAvatar />
      <div className="w-full flex justify-end">
        <Button
          onClick={() => setOpen(() => true)}
          htmlType="button"
          type="primary"
          color="green"
          className="ml-8"
        >
          بازنشانی رمز عبور
        </Button>
      </div>
      <ProfileForm />
    </div>
  );
}

export default ProfilePage;

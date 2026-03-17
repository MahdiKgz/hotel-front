import React from "react";
import ProfileForm from "@/features/profile/ui/ProfileForm";
import UploadUserAvatar from "@/features/profile/ui/UploadUserAvatar";

function ProfilePage() {
  return (
    <div className="w-full h-full flex flex-col items-start gap-6">
      <h1 className="font-bold text-xl">پروفایل کاربری</h1>
      <UploadUserAvatar />
      <ProfileForm />
    </div>
  );
}

export default ProfilePage;

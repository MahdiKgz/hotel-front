import UsersList from "@/features/user-management/ui/UsersList";
import React from "react";

function UsersManagement() {
  return (
    <div className="w-full h-full flex flex-col items-start gap-6">
      <h1 className="font-bold text-xl">مدیریت افراد</h1>
      <UsersList />
    </div>
  );
}

export default UsersManagement;

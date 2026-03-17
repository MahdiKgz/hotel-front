import React from "react";
import { RHFInput } from "@/shared/ui/RHFInput";
import { RiLockPasswordLine, RiSmartphoneLine } from "react-icons/ri";

function PasswordMethodLogin() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <RHFInput
        name="phone"
        placeholder="شماره تلفن خود را وارد کنید"
        rules={{ required: "شماره تلفن الزامیست" }}
        icon={<RiSmartphoneLine />}
      />
      <RHFInput
        name="password"
        placeholder="رمز عبور خود را وارد کنید"
        rules={{ required: "رمز عبور الزامیست" }}
        isPassword
        icon={<RiLockPasswordLine />}
      />
    </div>
  );
}

export default PasswordMethodLogin;

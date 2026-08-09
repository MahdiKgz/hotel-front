import React from "react";
import { RHFInput } from "@/shared/ui/RHFInput";
import { RiLockPasswordLine, RiSmartphoneLine } from "react-icons/ri";

function PasswordMethodLogin() {
  return (
    <div className="auth-fields">
      <RHFInput
        name="phone"
        label="شماره تلفن"
        placeholder="شماره تلفن خود را وارد کنید"
        rules={{ required: "شماره تلفن الزامیست" }}
        icon={<RiSmartphoneLine />}
      />
      <RHFInput
        name="password"
        label="رمز عبور"
        placeholder="رمز عبور خود را وارد کنید"
        rules={{ required: "رمز عبور الزامیست" }}
        isPassword
        icon={<RiLockPasswordLine />}
      />
    </div>
  );
}

export default PasswordMethodLogin;

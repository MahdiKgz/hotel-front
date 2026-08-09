import React from "react";
import { useSendOTPMutation } from "@/entities/User/services/auth.service";
import { RHFInput } from "@/shared/ui/RHFInput";
import { Button } from "antd";
import { toast } from "react-toastify";
import { RiLockPasswordLine, RiSmartphoneLine } from "react-icons/ri";
import type { FieldValues, UseFormReturn } from "react-hook-form";

interface ApiError {
  data?: { message?: string };
}

function OTPMethodLogin({ methods }: { methods: UseFormReturn<FieldValues> }) {
  const [sendOTP, { isLoading }] = useSendOTPMutation();

  const handleSendOTP = async () => {
    const phone = methods.getValues("phone");
    if (!phone) {
      methods.trigger("phone");
      return;
    }

    try {
      await sendOTP({ phone }).unwrap();
      toast.success("درخواست با موفقیت ارسال شد.");
    } catch (error: unknown) {
      const message = (error as ApiError).data?.message;
      if (message === "User not found !!") {
        toast.error("کاربری با این شماره تلفن وجود ندارد.");
      } else if (message?.includes("OTP already sent")) {
        toast.error(
          "رمز یکبار مصرف برای شما ارسال شده. بعد از یک دقیقه مجدد تلاش کنید",
        );
      }
      if (message === "You are banned.") {
        toast.error("شما مسدود شده اید.");
      }
    }
  };

  return (
    <div className="auth-fields">
      <RHFInput
        name="phone"
        label="شماره تلفن"
        placeholder="شماره تلفن خود را وارد کنید"
        rules={{ required: "شماره تلفن الزامیست" }}
        icon={<RiSmartphoneLine />}
      />

      <div className="flex w-full gap-2">
        <RHFInput
          name="otp"
          label="رمز یکبار مصرف"
          placeholder="رمز یکبار مصرف خود را وارد کنید"
          rules={{ required: "رمز یکبار مصرف الزامیست" }}
          icon={<RiLockPasswordLine />}
        />
        <Button
          disabled={isLoading}
          type="primary"
          size="large"
          onClick={handleSendOTP}
          className="auth-otp-button"
        >
          دریافت رمز
        </Button>
      </div>
    </div>
  );
}

export default OTPMethodLogin;

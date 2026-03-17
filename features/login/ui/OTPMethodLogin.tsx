import React from "react";
import { useSendOTPMutation } from "@/entities/User/services/auth.service";
import { RHFInput } from "@/shared/ui/RHFInput";
import { Button } from "antd";
import { toast } from "react-toastify";

function OTPMethodLogin({ methods }) {
  const { control } = methods;

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
    } catch (error) {
      if (error.data.message === "User not found !!") {
        toast.error("کاربری با این شماره تلفن وجود ندارد.");
      }
      if (error.data.message.includes("OTP already sent")) {
        toast.error(
          "رمز یکبار مصرف برای شما ارسال شده. بعد از یک دقیقه مجدد تلاش کنید",
        );
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <RHFInput
        name="phone"
        placeholder="شماره تلفن خود را وارد کنید"
        rules={{ required: "شماره تلفن الزامیست" }}
      />

      <div className="flex w-full gap-2">
        <RHFInput
          name="otp"
          placeholder="رمز یکبار مصرف خود را وارد کنید"
          rules={{ required: "رمز یکبار مصرف الزامیست" }}
        />
        <Button
          disabled={isLoading}
          type="primary"
          size="large"
          onClick={handleSendOTP}
        >
          دریافت رمز
        </Button>
      </div>
    </div>
  );
}

export default OTPMethodLogin;

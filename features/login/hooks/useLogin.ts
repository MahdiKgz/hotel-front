import {
  useLoginMutation,
  useVerifyOTPMutation,
} from "@/entities/User/services/auth.service";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function useLogin() {
  const [mode, setMode] = useState<"password" | "otp">("otp");

  const methods = useForm({
    mode: "onBlur",
  });
  const { reset } = methods;

  useEffect(() => {
    reset(
      mode === "password"
        ? { phone: "", password: "" }
        : { phone: "", otp: "" },
      { keepValues: true },
    );
  }, [mode, methods]);

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const [verifyOTP] = useVerifyOTPMutation();
  const [login] = useLoginMutation();

  let shouldDisableForm;

  if (isValid === false) {
    shouldDisableForm = true;
  }

  const onSubmit = async (data: unknown) => {
    if (mode === "otp") {
      try {
        const { data: verifyOtpResponse } = await verifyOTP(data).unwrap();
        console.log(verifyOtpResponse);
        toast.success("ورود موفقیت آمیز بود. خوش آمدید");
        sessionStorage.setItem("authToken", verifyOtpResponse.token);
        window.location.href = "/dashboard";
      } catch (err) {
        if (err.data.message === "Wrong or expired OTP") {
          toast.error("رمز یکبار مصرف منقضی شده یا اشتباه است");
        }
        if (
          err.data.message === "No such user is available , Register first !!"
        ) {
          toast.error("کاربری پیدا نشد. ابتدا در سایت ثبت نام کنید");
        }
      }
    }
    if (mode === "password") {
      try {
        const { data: loginResponse } = await login(data).unwrap();
        toast.success("ورود موفقیت آمیز بود. خوش آمدید");
        sessionStorage.setItem("authToken", loginResponse.token);
        window.location.href = "/dashboard";
      } catch (err) {
        if (err.data.message === "User not found !!") {
          toast.error("کاربری با این شماره تلفن پیدا نشد");
        }
        if (err.data.message === "Username or password is incorrect !!") {
          toast.error("نام کاربری یا رمز عبور اشتباه است.");
        }
      }
    }
  };

  return {
    mode,
    setMode,
    methods,
    handleSubmit,
    onSubmit,
    shouldDisableForm,
  };
}

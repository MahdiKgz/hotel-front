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
      await verifyOTP(data).unwrap();
      toast.success("ورود موفقیت آمیز بود. خوش آمدید");
    }
    if (mode === "password") {
      await login(data).unwrap();
      toast.success("ورود موفقیت آمیز بود. خوش آمدید");
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

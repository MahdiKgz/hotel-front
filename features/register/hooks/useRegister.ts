import { useForm } from "react-hook-form";
import { RegisterFormValues } from "../types/auth.types";
import { toast } from "react-toastify";
import { useRegisterMutation } from "@/entities/User/services/auth.service";

export default function useRegister() {
  const methods = useForm({
    mode: "onBlur",
  });
  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;

  const [register, { isLoading: isRequestSubmitting }] = useRegisterMutation();
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const result = await register({ ...data, role: "GUEST" }).unwrap();

      if (result.message === "User created successfully !!") {
        toast.success("ثبت نام انجام شد . خوش آمدید.");

        sessionStorage.setItem("authToken", result.data.token);
        reset();
        window.location.href = "/dashboard";
        return;
      }
    } catch (err) {
      if (err.data.message === "User already exists !!") {
        toast.error("کاربری با این شماره تلفن وجود دارد.");
      }
    }
  };

  let shouldDisableForm;

  if (isValid === false) {
    shouldDisableForm = true;
  }

  if (isRequestSubmitting) {
    shouldDisableForm = true;
  }

  return {
    methods,
    shouldDisableForm,
    handleSubmit,
    onSubmit,
  };
}

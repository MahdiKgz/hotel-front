import { useResetPasswordMutation } from "@/entities/User/services/auth.service";
import { clearUserProfile } from "@/entities/User/slices/Profile.slice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function useResetPassword() {
  const methods = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;

  const dispach = useDispatch();

  const [resetPassword, { isLoading: isSubmittingRequest }] =
    useResetPasswordMutation();

  const onSubmit = async (data: unknown) => {
    try {
      await resetPassword(data).unwrap();
      reset();
      toast.success("رمز عبور با موفقیت تغییر کرد.");
      dispach(clearUserProfile());
      sessionStorage.removeItem("authToken");
      window.location.href = "/login";
      return;
    } catch (err) {
      if (err.data.message === "User not found !!") {
        toast.error("کاربری پیدا نشد.");
        return;
      }
      if (err.data.message === "current password is not correct !!") {
        toast.error("رمز عبور یا تکرار رمز جدید درست نیست.");
        return;
      }
      if (
        err.data.message ===
        "new password and current password can not be same !!"
      ) {
        toast.error("رمز عبور فعلی و رمز جدید نمیتوانند یکسان باشند.");
        return;
      }
      if (
        err.data.message === "new password and its confirm are not matched !!"
      ) {
        toast.erorr("رمز جدید و تکرار آن یکسان نیستند.");
        return;
      }
      toast.error("در بازنشانی رمز عبور مشکلی وجود دارد.");
    }
  };

  let shouldDisableForm;

  if (!isValid || isSubmittingRequest) {
    shouldDisableForm = true;
  }

  return {
    methods,
    handleSubmit,
    onSubmit,
    shouldDisableForm,
  };
}

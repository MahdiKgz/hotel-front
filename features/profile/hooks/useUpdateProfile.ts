import { useUpdateProfileMutation } from "@/entities/User/services/auth.service";
import { RootState } from "@/shared/configs/store";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useUpdateProfile() {
  const profile = useSelector((state: RootState) => state.profile);

  const methods = useForm({
    defaultValues: { ...profile },
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit = async (data: unknown) => {
    const { id, avatar, ...rest } = data;
    try {
      await updateProfile(rest).unwrap();
      toast.success("اطلاعات کاربری با موفقیت به روزرسانی شد.");
    } catch (err) {
      if (err.data.message === "User NOT found !!") {
        toast.error("کاربری پیدا نشد");
      }
      toast.error("در به روزرسانی اطلاعات خطایی رخ داد");
    }
  };

  return {
    methods,
    isDirty,
    handleSubmit,
    onSubmit,
  };
}

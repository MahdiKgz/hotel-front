import { RootState } from "@/shared/configs/store";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function useUpdateProfile() {
  const profile = useSelector((state: RootState) => state.profile);

  const methods = useForm({
    defaultValues: { ...profile },
  });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit = async (data: unknown) => {
    console.log(data);
  };

  return {
    methods,
    isDirty,
    handleSubmit,
    onSubmit,
  };
}

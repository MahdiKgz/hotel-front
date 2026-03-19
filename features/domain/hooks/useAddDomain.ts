import { useForm } from "react-hook-form";
import { initialValuesType } from "../ui/AddOrEditDomainForm";
import {
  useCreateNewAmenityMutation,
  useUpdateAmenityMutation,
} from "@/entities/Domain/services/domain.service";
import { toast } from "react-toastify";

export default function useAddOrEditDomain(
  initialValues: initialValuesType | null,
) {
  const methods = useForm({
    defaultValues: initialValues === null ? {} : initialValues,
    mode: "onChange",
  });

  const {
    handleSubmit,
    // formState: { isDirty },
    reset,
  } = methods;

  const [createNewAmenity] = useCreateNewAmenityMutation();
  const [updateAmenity] = useUpdateAmenityMutation();

  const onSubmit = async (data: unknown) => {
    try {
      if (initialValues === null) {
        await createNewAmenity(data).unwrap();
        toast.success("امکانات جدید با موفقیت اضافه شد.");
        reset();
        return;
      }
      if (initialValues !== null) {
        await updateAmenity(data).unwrap();
        toast.success("امکانات با موفقیت به روزرسانی شد.");
        reset();
        return;
      }
    } catch (err) {
      if (err.data.message === "Amenity already exists") {
        toast.error("امکانات از قبل وجود دارد.");
      }
      if (err.data.message === "Amenity NOT found !!") {
        toast.error("امکانات پیدا نشد.");
      }
      toast.error("در ایجاد یا به روزرسانی امکانات مشکلی وجود دارد.");
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
  };
}

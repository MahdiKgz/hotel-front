import { useForm } from "react-hook-form";
import { initialValuesType } from "../ui/AddOrEditDomainForm";
import { useCreateNewAmenityMutation } from "@/entities/Domain/services/domain.service";
import { toast } from "react-toastify";

export default function useAddOrEditDomain(
  initialValues: initialValuesType | null,
) {
  const methods = useForm({
    defaultValues: initialValues === null ? {} : { ...initialValues },
    mode: "onChange",
  });

  const {
    handleSubmit,
    // formState: { isDirty },
    reset,
  } = methods;

  const [createNewAmenity] = useCreateNewAmenityMutation();

  const onSubmit = async (data: unknown) => {
    try {
      await createNewAmenity(data).unwrap();
      toast.success("امکانات جدید با موفقیت اضافه شد.");
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return {
    methods,
    handleSubmit,
    onSubmit,
  };
}

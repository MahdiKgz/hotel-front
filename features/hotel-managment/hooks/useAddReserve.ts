import { useCreateReserveMutation } from "@/entities/Hotel/services/hotel.service";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function useAddReserve(hotelId: number) {
  const methods = useForm({
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const [createReserve, { isLoading: isSubmittingForm }] =
    useCreateReserveMutation();

  const onSubmit = async (data: unknown) => {
    try {
      await createReserve({ ...data, hotelId }).unwrap();
      toast.success("رزرو با موفقیت ایجاد شد.");
    } catch (err) {
      toast.error(err?.data?.message || "مشکلی در ایجاد رزرو وجود دارد.");
    }
  };

  return {
    methods,
    handleSubmit,
    isValid,
    onSubmit,
    isSubmittingForm,
  };
}

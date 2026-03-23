import { useForm } from "react-hook-form";
import { Hotel } from "../types/hotel.types";
import { toast } from "react-toastify";
import { useUpdateHotelMutation } from "@/entities/Hotel/services/hotel.service";

export default function useUpdateHotel(hotel: Hotel) {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: { ...hotel },
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  const [updateHotel, { isLoading: isSubmittingForm }] =
    useUpdateHotelMutation();

  const onSubmit = async (data: Hotel) => {
    try {
      await updateHotel({ slug: hotel.slug, payload: data }).unwrap();
      toast.success("هتل با موفقیت ویرایش شد.");
      reset();
    } catch {
      toast.error("در ویرایش هتل ایرادی وجود دارد.");
    }
  };

  return {
    methods,
    isValid,
    onSubmit,
    handleSubmit,
    isSubmittingForm,
  };
}

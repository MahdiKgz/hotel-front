import { useForm } from "react-hook-form";
import { Hotel } from "../types/hotel.types";
import { toast } from "react-toastify";
import { useAddHotelMutation } from "@/entities/Hotel/services/hotel.service";

export default function useAddHotel() {
  const methods = useForm({
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  const [addHotel, { isLoading: isSubmittingForm }] = useAddHotelMutation();

  const onSubmit = async (data: Hotel) => {
    try {
      await addHotel(data).unwrap();
      toast.success("هتل با موفقیت ایجاد شد.");
      reset();
    } catch (err) {
      if (err.data.message === "Hotel already exists") {
        toast.error("هتل با این نام  یا نام اختصاری وجود دارد.");
        return;
      }
      if (err.data.message === "manager already has one active hotel.") {
        toast.error(
          "مسئول وارد شده نمیتواند بیش از یک هتل فعال در سامانه داشته باشد.",
        );
        return;
      }
      toast.error("در افزودن هتل ایرادی وجود دارد.");
    }
  };

  return {
    methods,
    isValid,
    onSubmit,
    handleSubmit,
    isValid,
    isSubmittingForm,
  };
}

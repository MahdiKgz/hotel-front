import { useForm } from "react-hook-form";
import { Hotel } from "../types/hotel.types";

export default function useAddHotel() {
  const methods = useForm({
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = methods;

  const onSubmit = async (data: Hotel) => {
    console.log("hotel payload", data);
  };

  return {
    methods,
    isValid,
    onSubmit,
    handleSubmit,
  };
}

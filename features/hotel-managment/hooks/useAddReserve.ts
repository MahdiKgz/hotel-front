import { useForm } from "react-hook-form";

export default function useAddReserve() {
  const methods = useForm({
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = async (data: unknown) => {
    console.log("Payload of add reserve", data);
  };

  return {
    methods,
    handleSubmit,
    isValid,
    onSubmit,
  };
}

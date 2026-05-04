import { useCreateHotelGeometryMutation } from "@/entities/Hotel/services/hotel.service";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function useCreateGeometry(hotelId: number) {
  const methods = useForm({
    mode: "all",
  });

  const [createHotelGeometry] = useCreateHotelGeometryMutation();

  const onSubmit = async (data: { lng: number; lat: number }) => {
    try {
      const payload = {
        type: "Point",
        coordinates: [data.lng, data.lat],
      };
      await createHotelGeometry({ hotelId, payload }).unwrap();
      toast.success("مختصات با موفقیت ایجاد شد.");
    } catch (err) {
      toast.error(err?.data?.message || "در ثبت مختصات ایرادی وجود دارد.");
    }
  };
  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  return { methods, isValid, handleSubmit, onSubmit };
}

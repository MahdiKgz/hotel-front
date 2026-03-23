import { useForm } from "react-hook-form";
import { Room } from "../types/room.types";
import { useCreateRoomMutation } from "@/entities/Hotel/services/hotel.service";
import { toast } from "react-toastify";

export default function useAddOrEditRoom(
  initialValues: Room | null,
  hotelId: number,
) {
  const methods = useForm({
    mode: "onChange",
    defaultValues: initialValues === null ? {} : initialValues,
  });

  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;

  const [createRoom] = useCreateRoomMutation();

  const onSubmit = async (data: Room) => {
    try {
      await createRoom({ ...data, hotel_id: hotelId }).unwrap();
      toast.success("اتاق با موفقیت ایجاد شد.");
      reset();
    } catch (err) {
      if (err.data.message === "room already exists.") {
        toast.error("اتاق در حال حاضر وجود دارد.");
      }
      toast.error("در ایجاد اتاق مشکلی وجود دارد.");
    }
  };

  return {
    methods,
    handleSubmit,
    isValid,
    onSubmit,
  };
}

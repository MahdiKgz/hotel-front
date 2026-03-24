import { useForm } from "react-hook-form";
import { Room } from "../types/room.types";
import {
  useCreateRoomMutation,
  useUpdateRoomMutation,
} from "@/entities/Hotel/services/hotel.service";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function useAddOrEditRoom(
  initialValues: Room | null,
  hotelId: number,
) {
  const methods = useForm({
    mode: "onChange",
    defaultValues: initialValues === null ? {} : { ...initialValues },
  });

  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;

  const [createRoom] = useCreateRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();

  useEffect(() => {
    if (initialValues) {
      reset({ ...initialValues });
    } else {
      reset({});
    }
  }, [initialValues, reset]);

  const onSubmit = async (data: Room) => {
    try {
      if (initialValues === null) {
        await createRoom({ ...data, hotel_id: hotelId }).unwrap();
        toast.success("اتاق با موفقیت ایجاد شد.");
        reset();
        return;
      }
      if (initialValues !== null) {
        await updateRoom({ slug: data.slug, payload: data }).unwrap();
        toast.success("اتاق با موفقیت ویرایش شد.");
        return;
      }
    } catch (err) {
      if (err.data.message === "room already exists.") {
        toast.error("اتاق در حال حاضر وجود دارد.");
      }

      if (initialValues !== null && err.data.message === "room NOT found !!") {
        toast.error("اتاق برای ویرایش وجود ندارد");
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

import { useGetAmenitiesQuery } from "@/entities/Domain/services/domain.service";
import { useCreateHotelAmenitiesMutation } from "@/entities/Hotel/services/hotel.service";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function useAddAmenities(hotelId: number) {
  const methods = useForm({
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const { data: allAmenities } = useGetAmenitiesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: !hotelId,
  });

  const amenitiesOptions = allAmenities?.data?.amenities.map((amenity) => ({
    value: amenity.id,
    label: amenity.title,
  }));

  const [createHotelAmenities] = useCreateHotelAmenitiesMutation();
  const onSubmit = async (data: number[]) => {
    try {
      const response = await createHotelAmenities({
        hotelId,
        amenities: data,
      }).unwrap();
      toast.success(response?.data?.message);
      return;
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  return {
    methods,
    handleSubmit,
    isValid,
    onSubmit,
    amenitiesOptions,
  };
}

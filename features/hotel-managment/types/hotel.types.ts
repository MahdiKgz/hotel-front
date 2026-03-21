import { Dispatch, SetStateAction } from "react";

export interface AddHotelModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface Hotel {
  name: string;
  slug: string;
  country: number;
  city: number;
  address: string;
  postalCode: string;
  stars: string;
  metroAccess: string;
  description: string;
  manager_id: number;
}

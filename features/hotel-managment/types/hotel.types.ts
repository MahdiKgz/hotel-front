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

export interface Reserve {
  startDate: string;
  endDate: string;
  user: {
    id: number;
    fullName: string;
    phone: string;
    avatar: string | null;
  };
  room: {
    id: number;
    name: string;
    slug: string;
  };
  hotel: {
    id: number;
    name: string;
    slug: string;
    cover: string | null;
  };
  note: string;
}



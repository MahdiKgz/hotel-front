import { FaHome, FaUserAlt } from "react-icons/fa";
import {
  FaCommentDots,
  FaGlobe,
  FaHotel,
  FaHouseChimney,
  FaUserShield,
} from "react-icons/fa6";
import { MdEvent } from "react-icons/md";

export const adminSidebar = [
  {
    label: "پیشخوان",
    icon: <FaHome />,
    url: "/dashboard",
  },
  {
    label: "مدیریت افراد",
    icon: <FaUserShield />,
    url: "/dashboard/users",
  },
  { label: "مدیریت هتل ها", icon: <FaHotel />, url: "/dashboard/hotels" },
  { label: "مدیریت دامنه ها", icon: <FaGlobe />, url: "/dashboard/domains" },
  { label: "مدیریت نظرات", icon: <FaCommentDots />, url: "/dashboard/comments" },
  {
    label: "پروفایل",
    icon: <FaUserAlt />,
    url: "/dashboard/profile",
  },
];

export const guestSidebar = [
  {
    label: "پیشخوان",
    icon: <FaHouseChimney size={17} />,
    url: "/dashboard",
  },
  {
    label: "رزرو های من",
    icon: <MdEvent size={17} />,
    url: "/dashboard/reserves",
  },
  {
    label: "پروفایل",
    icon: <FaUserAlt size={17} />,
    url: "/dashboard/profile",
  },
];

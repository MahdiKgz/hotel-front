import { FaHome, FaUserAlt } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { MdEvent, MdPerson2 } from "react-icons/md";

export const adminSidebar = [
  {
    label: "پیشخوان",
    icon: <FaHome />,
    url: "/dashboard",
  },
  {
    label: "مدیریت افراد",
    icon: "",
    url: "/dashboard/users",
  },
  { label: "مدیریت هتل ها", icon: "", url: "/dashboard/hotels" },
  { label: "مدیریت دامنه ها", icon: "", url: "/dashboard/domains" },
  {
    label: "پروفایل",
    icon: "",
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

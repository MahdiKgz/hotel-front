"use client";
import React from "react";
import { adminSidebar, guestSidebar } from "@/constants/sidebar.constant";
import { RootState } from "@/shared/configs/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

function Sidebar() {
  const { role } = useSelector((state: RootState) => state.profile);
  const pathname = usePathname();

  const sidebarData = role === "ADMIN" ? adminSidebar : guestSidebar;

  return (
    <div className="w-75 h-[85vh] hidden md:flex flex-col items-start gap-6 border-2 border-dashed border-mist-600/40 rounded p-4">
      <h1 className="text-xl font-bold">دسترسی سریع</h1>
      <ul className="w-full flex flex-col items-start gap-3">
        {sidebarData.map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link key={link.url} href={link.url} className="w-full">
              <li
                className={`
                  w-full py-3 px-2.5 flex items-center gap-2.5 rounded text-sm transition-all duration-300 font-medium
                  ${
                    isActive
                      ? "bg-sky-600 text-white shadow-md"
                      : "hover:bg-sky-600 hover:text-white text-gray-700"
                  }
                `}
              >
                {link.icon}
                {link.label}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;

"use client";

import { adminSidebar, guestSidebar } from "@/constants/sidebar.constant";
import { RootState } from "@/shared/configs/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { LuArrowRight, LuHeadphones, LuPlane } from "react-icons/lu";

export default function Sidebar() {
  const { role } = useSelector((state: RootState) => state.profile);
  const pathname = usePathname();
  const sidebarData = role === "ADMIN" ? adminSidebar : guestSidebar;

  return (
    <aside className="dashboard-sidebar">
      <Link href="/" className="brand dashboard-brand" aria-label="هُما - صفحه اصلی">
        <span className="brand-mark"><LuPlane /></span>
        <span><strong>هُما</strong><small>همراهِ سفرهای تو</small></span>
      </Link>

      <div className="sidebar-section-title">منوی اصلی</div>
      <nav className="sidebar-nav" aria-label="دسترسی‌های پنل">
        {sidebarData.map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link key={link.url} href={link.url} className={isActive ? "active" : ""}>
              <span className="sidebar-link-icon">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-support-card">
        <span><LuHeadphones /></span>
        <div><strong>نیاز به راهنمایی دارید؟</strong><small>پشتیبانی ما همیشه همراه شماست.</small></div>
        <a href="tel:02100000000">تماس با پشتیبانی</a>
      </div>

      <Link href="/" className="sidebar-home-link"><LuArrowRight /> بازگشت به وب‌سایت</Link>
    </aside>
  );
}

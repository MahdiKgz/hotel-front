"use client";

import AdminReports from "@/features/report/Admin/AdminReports";
import { RootState } from "@/shared/configs/store";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  LuArrowLeft,
  LuCalendarCheck2,
  LuMapPinned,
  LuSearch,
  LuSparkles,
  LuUserCog,
} from "react-icons/lu";

export default function DashboardMain() {
  const profile = useSelector((state: RootState) => state.profile);
  const firstName = profile.fullName?.split(" ")[0] || "همراه عزیز";
  const isAdmin = profile.role === "ADMIN";

  return (
    <div className="dashboard-home">
      <section className="dashboard-welcome">
        <div className="welcome-icon"><LuSparkles /></div>
        <div>
          <span>{isAdmin ? "مرکز کنترل هُما" : "سفرهایتان آماده‌اند"}</span>
          <h1>سلام {firstName}، خوش آمدید!</h1>
          <p>{isAdmin ? "وضعیت سامانه و تازه‌ترین آمار رزروها را اینجا ببینید." : "از اینجا می‌توانید مقصد بعدی را پیدا کنید و رزروهایتان را مدیریت کنید."}</p>
        </div>
        <Link href={isAdmin ? "/dashboard/hotels" : "/#search"}>
          {isAdmin ? "مدیریت هتل‌ها" : "شروع یک سفر"}<LuArrowLeft />
        </Link>
      </section>

      {isAdmin ? (
        <AdminReports />
      ) : (
        <>
          <div className="dashboard-page-heading">
            <div><span>دسترسی سریع</span><h2>چه کاری می‌خواهید انجام دهید؟</h2></div>
          </div>
          <div className="guest-action-grid">
            <Link href="/#search"><span><LuSearch /></span><div><strong>جستجوی اقامتگاه</strong><small>بین بهترین هتل‌ها و اقامتگاه‌ها بگردید.</small></div><LuArrowLeft /></Link>
            <Link href="/dashboard/reserves"><span><LuCalendarCheck2 /></span><div><strong>رزروهای من</strong><small>جزئیات سفرها و وضعیت رزرو را ببینید.</small></div><LuArrowLeft /></Link>
            <Link href="/dashboard/profile"><span><LuUserCog /></span><div><strong>تکمیل پروفایل</strong><small>اطلاعات حساب کاربری خود را به‌روز کنید.</small></div><LuArrowLeft /></Link>
          </div>
          <section className="empty-trip-card">
            <div><LuMapPinned /></div>
            <h2>هنوز سفری ثبت نکرده‌اید</h2>
            <p>مقصدتان را انتخاب کنید؛ باقی مسیر را هُما برایتان ساده می‌کند.</p>
            <Link href="/#search">پیدا کردن مقصد</Link>
          </section>
        </>
      )}
    </div>
  );
}

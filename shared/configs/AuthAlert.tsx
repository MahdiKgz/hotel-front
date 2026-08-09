"use client";

import Link from "next/link";
import { LuArrowRight, LuLockKeyhole, LuPlane } from "react-icons/lu";

export default function AuthAlert() {
  return (
    <main className="auth-guard-page">
      <Link href="/" className="brand auth-guard-brand">
        <span className="brand-mark"><LuPlane /></span>
        <span><strong>هُما</strong><small>همراهِ سفرهای تو</small></span>
      </Link>
      <section className="auth-guard-card">
        <span><LuLockKeyhole /></span>
        <small>دسترسی محدود</small>
        <h1>ابتدا وارد حساب خود شوید</h1>
        <p>برای مشاهده رزروها و مدیریت سفرها، ورود به حساب کاربری ضروری است.</p>
        <Link href="/login">ورود به حساب <LuArrowRight /></Link>
      </section>
    </main>
  );
}

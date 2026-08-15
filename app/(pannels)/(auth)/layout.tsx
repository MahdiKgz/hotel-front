import Link from "next/link";
import React from "react";
import {
  LuArrowRight,
  LuBadgeCheck,
  LuHeadphones,
  LuPlane,
  LuShieldCheck,
} from "react-icons/lu";
import AuthAccessBoundary from "@/features/login/ui/AuthAccessBoundary";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthAccessBoundary>
      <div className="auth-shell">
      <aside className="auth-visual">
        <div className="auth-visual-shade" />
        <Link href="/" className="brand auth-brand" aria-label="هُما - صفحه اصلی">
          <span className="brand-mark"><LuPlane /></span>
          <span><strong>هُما</strong><small>همراهِ سفرهای تو</small></span>
        </Link>

        <div className="auth-visual-copy">
          <span>یک حساب، هزار مقصد</span>
          <h1>سفر بعدی شما<br />از همین‌جا آغاز می‌شود.</h1>
          <p>رزروها، علاقه‌مندی‌ها و تجربه‌های سفر را یک‌جا مدیریت کنید.</p>
        </div>

        <div className="auth-trust-list">
          <div><LuShieldCheck /><span><strong>پرداخت امن</strong><small>حفاظت از اطلاعات شما</small></span></div>
          <div><LuHeadphones /><span><strong>پشتیبانی همیشگی</strong><small>همراه شما در هر ساعت</small></span></div>
          <div><LuBadgeCheck /><span><strong>رزرو مطمئن</strong><small>تأیید آنی و شفاف</small></span></div>
        </div>
      </aside>

      <section className="auth-panel">
        <div className="auth-panel-topbar">
          <Link href="/" className="auth-back-link"><LuArrowRight /> بازگشت به صفحه اصلی</Link>
          <Link href="/" className="brand auth-mobile-brand" aria-label="هُما - صفحه اصلی">
            <span className="brand-mark"><LuPlane /></span>
            <span><strong>هُما</strong><small>همراهِ سفرهای تو</small></span>
          </Link>
        </div>
        <div className="auth-content">{children}</div>
        <p className="auth-copyright">© ۱۴۰۵ هُما؛ تجربه‌ای امن برای سفرهای شما</p>
      </section>
      </div>
    </AuthAccessBoundary>
  );
}

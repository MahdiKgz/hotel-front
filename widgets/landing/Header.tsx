"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LuBookOpen,
  LuChevronDown,
  LuCircleHelp,
  LuLogOut,
  LuMenu,
  LuPlane,
  LuSettings,
  LuUserRound,
  LuX,
} from "react-icons/lu";
import { useGetMeQuery } from "@/entities/User/services/auth.service";
import { getApiAssetUrl } from "@/shared/configs/api";

interface HeaderProfileResponse {
  data?: {
    user?: {
      fullName?: string;
      phone?: string;
      avatar?: string | null;
    };
  };
}

const navItems = [
  { label: "بلیط", hasMenu: true },
  { label: "اقامت", hasMenu: true },
  { label: "تور", href: "#offers" },
  { label: "مجله گردشگری", href: "#inspiration" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [authState, setAuthState] = useState<"checking" | "guest" | "signed-in">("checking");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAuthState(sessionStorage.getItem("authToken") ? "signed-in" : "guest");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const { data: profileResponse, isLoading } = useGetMeQuery(undefined, {
    skip: authState !== "signed-in",
  });
  const profile = (profileResponse as HeaderProfileResponse | undefined)?.data?.user;
  const avatarUrl = getApiAssetUrl(profile?.avatar);
  const displayName = profile?.fullName || "کاربر هُما";

  function logout() {
    sessionStorage.removeItem("authToken");
    window.location.href = "/";
  }

  return (
    <header className="site-header">
      <div className="landing-container header-inner">
        <Link href="/" className="brand" aria-label="هُما - صفحه اصلی">
          <span className="brand-mark" aria-hidden="true">
            <LuPlane />
          </span>
          <span>
            <strong>هُما</strong>
            <small>همراهِ سفرهای تو</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="منوی اصلی">
          {navItems.map((item) => (
            <a key={item.label} href={item.href ?? "#search"}>
              {item.label}
              {item.hasMenu && <LuChevronDown aria-hidden="true" />}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href="#faq" className="support-link">
            <LuCircleHelp />
            <span>مرکز پشتیبانی</span>
          </a>
          {authState === "checking" || (authState === "signed-in" && isLoading) ? (
            <span className="header-account-loading" aria-label="در حال دریافت حساب کاربری" />
          ) : authState === "signed-in" && profile ? (
            <div className="public-account-menu">
              <button
                type="button"
                className="public-account-trigger"
                onClick={() => setAccountOpen((open) => !open)}
                aria-expanded={accountOpen}
              >
                <span
                  className="public-account-avatar"
                  style={avatarUrl ? { backgroundImage: `url(${JSON.stringify(avatarUrl)})` } : undefined}
                >
                  {!avatarUrl && displayName.trim().charAt(0)}
                </span>
                <span className="public-account-copy">
                  <small>حساب کاربری</small>
                  <strong>{displayName}</strong>
                </span>
                <LuChevronDown />
              </button>
              {accountOpen && (
                <div className="public-account-popover">
                  <div className="account-popover-heading">
                    <strong>{displayName}</strong>
                    <span>{profile.phone || "مهمان هُما"}</span>
                  </div>
                  <Link href="/bookings" onClick={() => setAccountOpen(false)}><LuBookOpen /><span><strong>رزروهای من</strong><small>مشاهده و مدیریت سفرها</small></span></Link>
                  <Link href="/dashboard/profile" onClick={() => setAccountOpen(false)}><LuSettings /><span><strong>اطلاعات حساب</strong><small>ویرایش پروفایل و رمز عبور</small></span></Link>
                  <button type="button" onClick={logout}><LuLogOut /> خروج از حساب</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="login-button">
              <LuUserRound />
              <span>ورود یا ثبت‌نام</span>
            </Link>
          )}
          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          >
            {menuOpen ? <LuX /> : <LuMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="منوی موبایل">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href ?? "#search"}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <LuChevronDown />
            </a>
          ))}
          <a href="#faq" onClick={() => setMenuOpen(false)}>
            مرکز پشتیبانی
          </a>
        </nav>
      )}
    </header>
  );
}

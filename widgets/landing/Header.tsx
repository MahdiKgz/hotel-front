"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LuChevronDown,
  LuCircleHelp,
  LuMenu,
  LuPlane,
  LuUserRound,
  LuX,
} from "react-icons/lu";

const navItems = [
  { label: "بلیط", hasMenu: true },
  { label: "اقامت", hasMenu: true },
  { label: "تور", href: "#offers" },
  { label: "مجله گردشگری", href: "#inspiration" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link href="/login" className="login-button">
            <LuUserRound />
            <span>ورود یا ثبت‌نام</span>
          </Link>
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

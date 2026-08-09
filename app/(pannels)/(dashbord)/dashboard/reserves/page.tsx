import Link from "next/link";
import { LuCalendarCheck2 } from "react-icons/lu";

export default function ReservesManagement() {
  return (
    <div className="dashboard-inner-page">
      <h1>رزروهای من</h1>
      <section className="dashboard-empty-state">
        <span><LuCalendarCheck2 /></span>
        <h2>هنوز رزروی ندارید</h2>
        <p>بعد از ثبت اولین سفر، جزئیات و وضعیت آن را از همین‌جا دنبال کنید.</p>
        <Link href="/#search">جستجوی سفر</Link>
      </section>
    </div>
  );
}

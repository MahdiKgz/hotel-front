import { LuMessageSquareText } from "react-icons/lu";

export default function CommentsManagement() {
  return (
    <div className="dashboard-inner-page">
      <h1>مدیریت نظرات</h1>
      <section className="dashboard-empty-state">
        <span><LuMessageSquareText /></span>
        <h2>نظر تازه‌ای برای بررسی نیست</h2>
        <p>دیدگاه‌های جدید کاربران پس از ثبت در این بخش نمایش داده می‌شوند.</p>
      </section>
    </div>
  );
}

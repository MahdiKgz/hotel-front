import LoginForm from "@/features/login/ui/LoginForm";
import Link from "next/link";
import { LuLogIn } from "react-icons/lu";

export default function Login() {
  return (
    <div className="auth-card">
      <div className="auth-card-icon"><LuLogIn /></div>
      <div className="auth-card-header">
        <span>خوش برگشتید</span>
        <h1>ورود به حساب کاربری</h1>
        <p>اطلاعات خود را وارد کنید تا سفر را ادامه دهید.</p>
      </div>
      <LoginForm />
      <div className="auth-switch-link">
        <span>هنوز حساب کاربری ندارید؟</span>
        <Link href="/register">ساخت حساب جدید</Link>
      </div>
    </div>
  );
}

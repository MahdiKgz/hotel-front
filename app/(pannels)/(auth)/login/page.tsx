import LoginForm from "@/features/login/ui/LoginForm";
import Link from "next/link";
import { LuLogIn } from "react-icons/lu";

interface LoginPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Login({ searchParams }: LoginPageProps) {
  const query = await searchParams;
  const redirect = Array.isArray(query.redirect) ? query.redirect[0] : query.redirect;
  const registerHref = redirect
    ? `/register?redirect=${encodeURIComponent(redirect)}`
    : "/register";

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
        <Link href="/forgot-password">رمز عبور را فراموش کرده‌اید؟</Link>
      </div>
      <div className="auth-switch-link">
        <span>هنوز حساب کاربری ندارید؟</span>
        <Link href={registerHref}>ساخت حساب جدید</Link>
      </div>
    </div>
  );
}

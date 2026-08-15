import RegisterForm from "@/features/register/ui/RegisterForm";
import Link from "next/link";
import { LuUserPlus } from "react-icons/lu";

interface RegisterPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Register({ searchParams }: RegisterPageProps) {
  const query = await searchParams;
  const redirect = Array.isArray(query.redirect) ? query.redirect[0] : query.redirect;
  const loginHref = redirect
    ? `/login?redirect=${encodeURIComponent(redirect)}`
    : "/login";

  return (
    <div className="auth-card">
      <div className="auth-card-icon"><LuUserPlus /></div>
      <div className="auth-card-header">
        <span>به هُما خوش آمدید</span>
        <h1>ساخت حساب کاربری</h1>
        <p>تنها چند قدم تا تجربه آسان‌تر سفر فاصله دارید.</p>
      </div>
      <RegisterForm />
      <div className="auth-switch-link">
        <span>قبلاً ثبت‌نام کرده‌اید؟</span>
        <Link href={loginHref}>ورود به حساب</Link>
      </div>
    </div>
  );
}

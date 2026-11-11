"use client";

import { Button, Input } from "antd";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { LuKeyRound, LuMailCheck } from "react-icons/lu";
import {
  useForgotPasswordMutation,
  useRecoverPasswordMutation,
  useVerifyEmailMutation,
} from "@/entities/User/services/auth.service";

const content = {
  forgot: ["فراموشی رمز عبور", "ایمیل تأییدشدهٔ حساب خود را وارد کنید.", "ارسال لینک بازیابی"],
  reset: ["انتخاب رمز عبور جدید", "رمزی با حداقل ۸ نویسه انتخاب کنید.", "ذخیره رمز عبور جدید"],
  verify: ["تأیید ایمیل", "برای ثبت این ایمیل در حساب هُما، آن را تأیید کنید.", "تأیید ایمیل"],
} as const;

const getStatus = (error: unknown) =>
  error && typeof error === "object" && "status" in error ? error.status : undefined;

export default function RecoveryCard({ mode }: { mode: keyof typeof content }) {
  const [title, description, submitText] = content[mode];
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [forgot, forgotState] = useForgotPasswordMutation();
  const [reset, resetState] = useRecoverPasswordMutation();
  const [verify, verifyState] = useVerifyEmailMutation();
  const pending = forgotState.isLoading || resetState.isLoading || verifyState.isLoading;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setError("");
    const data = new FormData(event.currentTarget);
    const token = window.location.hash.slice(1);
    if (mode !== "forgot" && !/^[A-Za-z0-9_-]{43}$/.test(token)) {
      setError("لینک نامعتبر است. لطفاً دوباره درخواست دهید.");
      return;
    }
    const password = String(data.get("password") ?? "");
    const confirmPassword = String(data.get("confirmPassword") ?? "");
    if (mode === "reset" && (password !== confirmPassword ||
        [...password].length < 8 || new TextEncoder().encode(password).length > 72)) {
      setError("رمز و تکرار آن باید یکسان باشند. اگر رمز طولانی است، آن را کوتاه‌تر کنید.");
      return;
    }

    try {
      if (mode === "forgot") {
        await forgot({ email: String(data.get("email")).trim() }).unwrap();
        setSuccess("اگر این ایمیل برای حسابی تأیید شده باشد، لینک بازیابی به آن ارسال می‌شود.");
      } else {
        if (mode === "reset") {
          await reset({ token, password, confirmPassword }).unwrap();
          sessionStorage.removeItem("authToken");
          setSuccess("رمز عبور تغییر کرد. حالا می‌توانید با رمز جدید وارد شوید.");
        } else {
          await verify({ token }).unwrap();
          setSuccess("ایمیل حساب تأیید شد. از این پس می‌توانید با این ایمیل رمزتان را بازیابی کنید.");
        }
        window.history.replaceState(window.history.state, "", window.location.pathname);
      }
    } catch (failure) {
      const status = getStatus(failure);
      if (status === 429) setError("تعداد درخواست‌ها زیاد است. کمی بعد دوباره تلاش کنید.");
      else if (status === 409) setError("این ایمیل قبلاً برای حساب دیگری تأیید شده است.");
      else if (status === 400 && mode !== "forgot") setError("لینک نامعتبر یا منقضی شده است. لطفاً دوباره درخواست دهید.");
      else if (status === 400) setError("ایمیل معتبر وارد کنید.");
      else setError("در حال حاضر درخواست انجام نشد. لطفاً دوباره تلاش کنید.");
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-card-icon">{mode === "verify" ? <LuMailCheck /> : <LuKeyRound />}</div>
      <div className="auth-card-header">
        <span>امنیت حساب</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {success ? <p role="status">{success}</p> : (
        <form className="auth-form" onSubmit={submit}>
          {mode === "forgot" && (
            <label className="auth-fields">
              <span className="app-field-label">ایمیل تأییدشده</span>
              <Input size="large" name="email" type="email" autoComplete="email" maxLength={100} required dir="ltr" />
            </label>
          )}
          {mode === "reset" && (
            <div className="auth-fields">
              <label>
                <span className="app-field-label">رمز عبور جدید</span>
                <Input.Password size="large" name="password" autoComplete="new-password" required dir="ltr" />
              </label>
              <label>
                <span className="app-field-label">تکرار رمز عبور جدید</span>
                <Input.Password size="large" name="confirmPassword" autoComplete="new-password" required dir="ltr" />
              </label>
            </div>
          )}
          {error && <p className="text-red-600 text-sm" role="alert">{error}</p>}
          <Button className="auth-submit-button" size="large" type="primary" htmlType="submit" loading={pending}>
            {submitText}
          </Button>
        </form>
      )}
      <div className="auth-switch-link">
        {mode === "verify" ? <Link href="/dashboard/profile">بازگشت به پروفایل</Link> : <Link href="/login">بازگشت به ورود</Link>}
        {mode === "reset" && !success && <Link href="/forgot-password">درخواست لینک جدید</Link>}
      </div>
    </div>
  );
}

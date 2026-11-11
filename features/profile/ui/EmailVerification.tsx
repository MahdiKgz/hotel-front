"use client";

import { Button, Input } from "antd";
import { useState, type FormEvent } from "react";
import { useSelector } from "react-redux";
import { useRequestEmailVerificationMutation } from "@/entities/User/services/auth.service";
import type { RootState } from "@/shared/configs/store";

export default function EmailVerification() {
  const { email, emailVerified } = useSelector((state: RootState) => state.profile);
  const [request, { isLoading }] = useRequestEmailVerificationMutation();
  const [feedback, setFeedback] = useState<{ email: string; error: boolean; text: string }>();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || isLoading) return;
    const form = event.currentTarget;
    const password = String(new FormData(form).get("password") ?? "");
    try {
      await request({ password }).unwrap();
      form.reset();
      setFeedback({ email, error: false, text: "لینک تأیید ارسال شد. صندوق ورودی ایمیل خود را بررسی کنید." });
    } catch (error) {
      const status = error && typeof error === "object" && "status" in error ? error.status : undefined;
      const text = status === 400 ? "رمز فعلی را بررسی کنید." :
        status === 429 ? "تعداد درخواست‌ها زیاد است. کمی بعد دوباره تلاش کنید." :
          "ارسال ایمیل انجام نشد. دوباره تلاش کنید.";
      setFeedback({ email, error: true, text });
    }
  }

  return (
    <section className="w-full space-y-3 rounded-xl border p-4 md:p-6" aria-labelledby="email-verification-title">
      <h2 id="email-verification-title" className="font-bold">ایمیل بازیابی رمز عبور</h2>
      {!email ? <p>برای فعال کردن بازیابی رمز، ابتدا ایمیل را در پروفایل ذخیره کنید.</p> :
        emailVerified ? <p>ایمیل <bdi>{email}</bdi> تأیید شده است.</p> : (
          <form onSubmit={submit} className="max-w-sm space-y-3" key={email}>
            <p>برای ارسال لینک تأیید به <bdi>{email}</bdi>، رمز فعلی را وارد کنید.</p>
            <label>
              <span className="app-field-label">رمز عبور فعلی</span>
              <Input.Password name="password" autoComplete="current-password" required dir="ltr" />
            </label>
            <Button type="primary" htmlType="submit" loading={isLoading}>ارسال لینک تأیید</Button>
            {feedback?.email === email && (
              <p role={feedback.error ? "alert" : "status"}>{feedback.text}</p>
            )}
          </form>
        )}
    </section>
  );
}

import Providers from "@/shared/configs/Providers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "هُما | رزرو بلیط، هتل و تور",
  description: "رزرو آنلاین پرواز، قطار، اتوبوس، هتل، اقامتگاه و تور با پشتیبانی ۲۴ ساعته.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <Providers>
        <body className="w-full h-full">{children}</body>
      </Providers>
    </html>
  );
}

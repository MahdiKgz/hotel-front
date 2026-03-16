import Providers from "@/shared/configs/Providers";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className="w-full h-full">{children}</body>
      </Providers>
    </html>
  );
}

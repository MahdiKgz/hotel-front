import Header from "@/widgets/landing/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full">
        <Header />
        {children}
      </body>
    </html>
  );
}

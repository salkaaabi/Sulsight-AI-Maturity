import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SessionProvider } from "@/lib/session";

export const metadata: Metadata = {
  title: "منظومة الفجيرة للوعي والتمكين المالي",
  description:
    "منصة رقمية وتدريبية تبني سلوكاً مالياً واعياً من المدرسة إلى مختلف مراحل الحياة — نموذج تجريبي لأغراض العرض.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FBFAF7] font-sans antialiased">
        <SessionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-white"
          >
            تخطَّ إلى المحتوى
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SessionProvider>
      </body>
    </html>
  );
}

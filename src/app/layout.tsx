import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/src/components/home/homeData";
import { Header } from "@/src/components/home/Header";
import { Footer } from "@/src/components/home/Footer";
import { SideMenuProvider } from "@/src/components/layout/SideMenuProvider";
import { QueryProvider } from "@/src/providers/QueryProvider";
import { SiteFavicon } from "@/src/components/layout/SiteFavicon";

const GA_MEASUREMENT_ID = "G-LFJ1Q030N3";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50">
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <QueryProvider>
          <SiteFavicon />
          <SideMenuProvider>
            <Header />
            <main className="flex min-h-0 flex-1 flex-col">{children}</main>
            <Footer />
          </SideMenuProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

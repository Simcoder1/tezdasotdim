import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tezdasotdim.vercel.app";
const analyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tayyor Telegram botlar",
  url: siteUrl,
  inLanguage: "uz",
  description: "Biznes uchun tayyor Telegram botlarni topish xizmati.",
};

export const metadata: Metadata = {
  title: {
    default: "Tayyor Telegram bot sotib olish",
    template: "%s | Tayyor Telegram botlar",
  },
  description:
    "Biznesingiz uchun tayyor Telegram bot sotib oling. Buyurtma, savdo, kurs, obuna va mijozlarga xizmat ko‘rsatish botlarini tez toping.",
  keywords: [
    "telegram bot sotib olish",
    "tayyor telegram bot",
    "telegram bot narxi",
    "biznes uchun telegram bot",
    "o'zbekiston telegram bot",
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  verification: googleVerification ? { google: googleVerification } : undefined,
  openGraph: {
    title: "Tayyor Telegram bot toping",
    description:
      "Biznesingiz uchun tayyor Telegram botni tez toping.",
    url: siteUrl,
    siteName: "Tayyor Telegram botlar",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className="min-h-screen text-slate-900 antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c") }}
        />
        {analyticsId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${analyticsId}',{send_page_view:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

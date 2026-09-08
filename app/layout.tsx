import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tezdasotdim.vercel.app";
const analyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tezda Sotdim",
  alternateName: ["TezdaSotdim", "Tayyor Telegram botlar"],
  url: siteUrl,
  inLanguage: "uz",
  description: "Tezda Sotdim orqali biznes uchun tayyor Telegram botlarni toping va sotib oling.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tezda Sotdim",
  alternateName: "TezdaSotdim",
  url: siteUrl,
  logo: `${siteUrl}/bot-icon.jpg`,
  sameAs: ["https://t.me/tezdasotdim"],
};

export const metadata: Metadata = {
  applicationName: "Tezda Sotdim",
  title: {
    default: "Tezda Sotdim — Tayyor Telegram bot sotib olish",
    template: "%s | Tezda Sotdim",
  },
  description:
    "Tezda Sotdim orqali biznesingiz uchun tayyor Telegram bot sotib oling. Buyurtma, savdo, kurs, obuna va xizmat botlarini tez toping.",
  keywords: [
    "telegram bot sotib olish",
    "tayyor telegram bot",
    "telegram bot narxi",
    "biznes uchun telegram bot",
    "o'zbekiston telegram bot",
    "telegram bot kerak",
    "telegram bot sotiladi",
    "tezda sotdim",
    "tezdasotdim",
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  verification: googleVerification ? { google: googleVerification } : undefined,
  openGraph: {
    title: "Tezda Sotdim — Tayyor Telegram bot toping",
    description:
      "Biznesingiz uchun tayyor Telegram botni tez toping.",
    url: siteUrl,
    siteName: "Tezda Sotdim",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
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

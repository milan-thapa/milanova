import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp";
import CookieConsent from "@/components/shared/CookieConsent";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";
import SkipToContent from "@/components/shared/SkipToContent";
import { headers } from "next/headers";
import { OrganizationStructuredData, WebSiteStructuredData } from "@/components/seo/StructuredData";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://milanova.com'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: "Milanova - Digital Solutions for Every Mission-Driven Team",
    template: "%s | Milanova"
  },
  description: "Nepal's leading web development company. eCommerce, Web Development, SaaS Development, and UI/UX Design services for businesses worldwide.",
  keywords: ["web development Nepal", "eCommerce Nepal", "SaaS development", "UI/UX design", "custom web development", "digital agency", "software development"],
  authors: [{ name: "Milanova Team" }],
  creator: "Milanova",
  publisher: "Milanova",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://milanova.com",
    title: "Milanova - Digital Solutions for Every Mission-Driven Team",
    description: "Nepal's leading web development company. eCommerce, Web Development, SaaS Development, and UI/UX Design services.",
    siteName: "Milanova",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Milanova - Digital Solutions for Every Mission-Driven Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milanova - Digital Solutions for Every Mission-Driven Team",
    description: "Nepal's leading web development company. eCommerce, Web Development, SaaS Development, and UI/UX Design services.",
    images: ["/images/og-image.jpg"],
    creator: "@milanova",
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "/";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${poppins.variable} font-sans`}>
        <SkipToContent />
        <OrganizationStructuredData
          name="Milanova"
          url="https://milanova.com"
          logo="https://milanova.com/logo.png"
          description="Nepal's leading web development company. eCommerce, Web Development, SaaS Development, and UI/UX Design services for businesses worldwide."
          sameAs={[
            "https://facebook.com/milanova",
            "https://instagram.com/milanova",
            "https://linkedin.com/company/milanova",
            "https://twitter.com/milanova",
          ]}
          address={{
            streetAddress: "Kathmandu",
            addressLocality: "Kathmandu",
            addressCountry: "NP",
          }}
          contactPoint={{
            telephone: "+977-1-XXXXXXX",
            contactType: "customer service",
          }}
        />
        <WebSiteStructuredData
          name="Milanova"
          url="https://milanova.com"
          description="Nepal's leading web development company. eCommerce, Web Development, SaaS Development, and UI/UX Design services for businesses worldwide."
        />
        {!isAdmin && <Navbar />}
        <main id="main-content">{children}</main>
        {!isAdmin && <Footer />}
        {!isAdmin && <FloatingWhatsApp />}
        {!isAdmin && <CookieConsent />}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && <GoogleAnalytics />}
        <Toaster />
      </body>
    </html>
  );
}

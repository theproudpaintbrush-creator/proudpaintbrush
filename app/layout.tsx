import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalVideoTestimonials from "@/components/GlobalVideoTestimonials";
import MobileCTABar from "@/components/MobileCTABar";
import ChatWidget from "@/components/ChatWidget";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import { SITE_URL, RATING_VALUE, REVIEW_COUNT } from "@/lib/site";

// Stable @id for the founder Person entity. Defined in full on /our-story and
// referenced from the business node and blog author attributions so search
// engines resolve a single Chris Petkau entity across the site.
export const FOUNDER_ID = `${SITE_URL}/our-story#chris-petkau`;

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    // Page titles already include the brand, so no "%s | brand" template
    // (that double-appended it). Pages without a title fall back to `default`.
    default: "The Proud Paintbrush | Sugar Land Painting Contractor",
    template: "%s",
  },
  description:
    "Professional residential & commercial painting in Sugar Land, Fort Bend County & West Houston. Fully insured, 2 & 5-Year Written Warranty. Call (832) 605-0493.",
  metadataBase: new URL("https://www.theproudpaintbrush.com"),
  openGraph: {
    type: "website",
    siteName: "The Proud Paintbrush",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "PaintingContractor"],
  "@id": "https://www.theproudpaintbrush.com/#business",
  name: "The Proud Paintbrush",
  image: "https://www.theproudpaintbrush.com/images/logo.png",
  logo: "https://www.theproudpaintbrush.com/images/logo.png",
  telephone: "+18326050493",
  email: "info@theproudpaintbrush.com",
  url: "https://www.theproudpaintbrush.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sugar Land",
    addressRegion: "TX",
    postalCode: "77498",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 29.6196,
    longitude: -95.6349,
  },
  areaServed: [
    "Sugar Land, TX",
    "Richmond, TX",
    "Katy, TX",
    "Missouri City, TX",
    "Fulshear, TX",
    "Rosenberg, TX",
    "West Houston, TX",
    "Southwest Houston, TX",
  ],
  priceRange: "$$",
  foundingDate: "2020",
  founder: { "@type": "Person", "@id": FOUNDER_ID, name: "Chris Petkau" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: RATING_VALUE, reviewCount: REVIEW_COUNT },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/theproudpaintbrushllc",
    "https://www.facebook.com/theproudpaintbrush",
    "https://www.linkedin.com/company/the-proud-paintbrush",
    "https://www.youtube.com/@theproudpaintbrush",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col font-[family-name:var(--font-poppins)] antialiased pb-[60px] xl:pb-0"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-[#1a2e44] focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <GlobalVideoTestimonials />
        <Footer />
        <MobileCTABar />
        <ChatWidget />
        <GoogleAnalytics />
        <AnalyticsEvents />
      </body>
    </html>
  );
}

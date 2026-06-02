import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    "Professional residential & commercial painting in Sugar Land, Fort Bend County & West Houston. Licensed, insured, 2-5 year warranty. Call (832) 605-0493.",
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
  image:
    "https://images.squarespace-cdn.com/content/v1/6245121c345d9b583ef8e7b7/8ab85515-fa22-4454-a968-a8b8add58e5b/Logo-06-1+png.png",
  telephone: "+18326050493",
  email: "info@theproudpaintbrush.com",
  url: "https://www.theproudpaintbrush.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "",
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
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: 113 },
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
        className="min-h-full flex flex-col font-[family-name:var(--font-poppins)] antialiased"
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import { CartProvider } from "./lib/CartContext";
import { SITE } from "./lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });

const TITLE = "FK Collection | Premium Watches in Pakistan - Cash on Delivery";
const DESC = "Buy premium watches, rings and bracelets online in Pakistan. Gift box included, 7 days return, free delivery above Rs. 5000 and cash on delivery.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s | FK Collection" },
  description: DESC,
  keywords: ["watches Pakistan", "buy watches online Pakistan", "men watches", "watch with ring and bracelet", "cash on delivery watches", "FK Collection"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "FK Collection", locale: "en_PK", title: TITLE, description: DESC, images: ["/watch1.jpg"] },
  robots: { index: true, follow: true },
};

// Pinch-zoom stays enabled for accessibility; form fields use 16px text so iOS does not auto-zoom.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "FK Collection",
  url: SITE,
  telephone: "+923099956578",
  areaServed: "PK",
  paymentAccepted: "Cash on delivery, Easypaisa, JazzCash",
  address: { "@type": "PostalAddress", addressLocality: "Swat", addressCountry: "PK" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <CartProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-white focus:px-3 focus:py-2">Skip to content</a>
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}

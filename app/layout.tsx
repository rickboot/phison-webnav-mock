import type { Metadata } from "next";
import { Raleway, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NavVersionProvider } from "@/components/NavVersionProvider";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "PHISON Electronics Corp.",
    template: "%s | PHISON",
  },
  description:
    "A world leader in NAND controllers and flash storage solutions. Internal 2027 IA prototype for navigation review.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${raleway.variable} ${roboto.variable} h-full antialiased`}>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="min-h-full flex flex-col">
        <NavVersionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NavVersionProvider>
      </body>
    </html>
  );
}

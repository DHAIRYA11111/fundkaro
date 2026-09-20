import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChandaDedo — Fund the Next Big Indian Innovation",
  description: "Indian startup crowdfunding platform to discover and fund innovative ideas.",
  openGraph: {
    title: "ChandaDedo — Fund the Next Big Indian Innovation",
    description: "Indian startup crowdfunding platform to discover and fund innovative ideas.",
    siteName: "ChandaDedo",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" }
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${inter.className} flex flex-col min-h-screen w-full`}>
        <Navbar />
        <div className="flex-1 flex flex-col w-full">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

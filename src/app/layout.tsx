import type { Metadata } from "next";
import { Cabin } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const cabin = Cabin({
  subsets: ["latin"],
  variable: "--font-cabin",
});

export const metadata: Metadata = {
  title: "Ganesha Supply",
  description: "Inventory Management System for Photocopy Shop in ITB",
  icons: {
    icon: "/logo/logo.svg",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cabin.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

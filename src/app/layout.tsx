import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HIRO Protocol | Your Personalized Wellness Routine",
  description:
    "Answer a few questions about your lifestyle, goals, and challenges. We will create a personalized HIRO routine designed around your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-[#111] dark:bg-[#0a0a0a] dark:text-[#f5f5f5]`}
      >
        <div className="fixed inset-0 bg-white dark:bg-[#0a0a0a] -z-10" />
        {children}
      </body>
    </html>
  );
}

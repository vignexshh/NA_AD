import type { Metadata } from "next";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from './ClientWrapper';
 
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

 
export const metadata: Metadata = {
  title: "MedicalHunt NextGen",
  description: "A application to analyse and tabulate NEET scores across india for better preperations",
};

 
export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap children in the ClientWrapper */}
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
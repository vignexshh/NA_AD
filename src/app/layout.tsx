import type { Metadata } from "next";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from './ClientWrapper';
// Configure Geist fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define metadata
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// RootLayout component
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
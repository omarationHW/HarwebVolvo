import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "HarwebDBO - Volvo",
  description: "Sistema de gestión de órdenes de trabajo y nómina",
  keywords: "harweb, volvo, gestión, órdenes de trabajo, nómina",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1e293b",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/icon-192b.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-192b.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icon-192b.png",
        sizes: "16x16",
        type: "image/png",
      }
    ],
    apple: [
      {
        url: "/icon-192b.png",
        sizes: "180x180",
        type: "image/png",
      }
    ],
    shortcut: "/icon-192b.png"
  },
  other: {
    "msapplication-TileColor": "#1e293b",
    "msapplication-TileImage": "/icon-192b.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

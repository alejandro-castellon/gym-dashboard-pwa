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
  title: "Gym member portal",
  description: "It's a progressive web application for gym members",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next15", "pwa", "next-pwa"],
  authors: [
    {
      name: "licasoftware",
      url: "https://www.linkedin.com/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

// Generate viewport settings dynamically
export const generateViewport = () => ({
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const viewport = generateViewport();

  return (
    <html lang="en" className={viewport.themeColor ? "dark-theme" : ""}>
      <head>
        <meta name="viewport" content={viewport.viewport} />
        <meta name="theme-color" content={viewport.themeColor?.[0]?.color} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

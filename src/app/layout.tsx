import type { Metadata } from "next";
import { geistSans, geistMono } from "@/fonts";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang="es" className={viewport.themeColor ? "dark-theme" : ""}>
      <head>
        <meta name="viewport" content={viewport.viewport} />
        <meta name="theme-color" content={viewport.themeColor?.[0]?.color} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}

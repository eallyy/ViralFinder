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
  title: "Page Not Found | Trendella",
  description: "Oops! The page you're looking for doesn't exist. Return to the homepage and explore coffee recipes, brewing guides, and more.",
  openGraph: {
    title: "Page Not Found | SmartBrew",
    description: "Oops! The page you're looking for doesn't exist. Return to the homepage and explore coffee recipes, brewing guides, and more.",
    url: "https://smartbrew.co/404",
    siteName: "SmartBrew",
    images: [
      {
        url: "https://smartbrew.co/og-image-404.jpg",
        width: 1200,
        height: 630,
        alt: "404 - Page Not Found",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found | SmartBrew",
    description: "Oops! The page you're looking for doesn't exist. Return to the homepage and explore coffee recipes, brewing guides, and more.",
    images: ["https://smartbrew.co/twitter-404.jpg"],
  },
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
          className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import { AuthLayout } from '@/components/auth-layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: "Trendella",
    template: "%s | SmartBrew",
  },
  description: "Join SmartBrew to access personalized coffee recipes and elevate your brewing experience.",
  openGraph: {
    title: "SmartBrew - Craft Your Perfect Coffee Recipe",
    description: "Join SmartBrew to access personalized coffee recipes and elevate your brewing experience.",
    url: "https://smartbrew.co",
    siteName: "SmartBrew",
    images: [
      {
        url: "https://smartbrew.co/og-image-auth.jpg",
        width: 1200,
        height: 630,
        alt: "SmartBrew Authentication",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartBrew - Craft Your Perfect Coffee Recipe",
    description: "Join SmartBrew to access personalized coffee recipes and elevate your brewing experience.",
    images: ["https://smartbrew.co/twitter-auth.jpg"],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>
}


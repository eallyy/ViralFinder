import { ApplicationLayout } from '@/components/application-layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: "SmartBrew - Elevate Your Coffee Brewing Experience",
    template: "%s | SmartBrew",
  },
  description: "Personalized coffee recipes, brewing guides, and more ‚Äì all tailored to your taste preferences.",
  openGraph: {
    title: "SmartBrew - Elevate Your Coffee Brewing Experience",
    description: "Personalized coffee recipes, brewing guides, and more ‚Äì all tailored to your taste preferences.",
    url: "https://smartbrew.co",
    siteName: "SmartBrew",
    images: [
      {
        url: "https://smartbrew.co/og-image-app.jpg",
        width: 1200,
        height: 630,
        alt: "SmartBrew App",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartBrew - Elevate Your Coffee Brewing Experience",
    description: "Personalized coffee recipes, brewing guides, and more ‚Äì all tailored to your taste preferences.",
    images: ["https://smartbrew.co/twitter-app.jpg"],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (<ApplicationLayout>
        {children}
        </ApplicationLayout>)
}


import { AuthLayout } from '@/components/auth-layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Viral Finder | Trendella",
  description:
    "Instagram'da öne çıkan, yüksek etkileşimli içerikleri keşfedin. Viral Finder ile sektörde trend olan içerikleri anlık olarak analiz edin.",
  openGraph: {
    title: "Viral Finder | Trendella",
    description:
      "Instagram'da yüksek performans gösteren Reels içeriklerini anlık takip edin. Trendleri kaçırmayın.",
    url: "https://trendella.com/viral-finder",
    siteName: "Trendella",
    images: [
      {
        url: "https://trendella.com/og-image.jpg", // varsayılan bir görsel URL’si, değiştirilebilir
        width: 1200,
        height: 630,
        alt: "Trendella Viral Finder",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viral Finder | Trendella",
    description:
      "Instagram'ın en çok izlenen Reels içeriklerini analiz edin. Viral olan ürünleri kaçırmayın.",
    images: ["https://trendella.com/og-image.jpg"],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>
}


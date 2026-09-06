import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ever After Diamonds | Bespoke Fine Diamond Jewellers UK',
  description:
    'Luxury bespoke diamond jewelry storefront for Ever After Diamonds UK, featuring handcrafted engagement rings, certified fine jewelry, and exclusive diamond collections.',
  openGraph: {
    title: 'Ever After Diamonds | Bespoke Fine Diamond Jewellers UK',
    description:
      'Luxury bespoke diamond jewelry storefront for Ever After Diamonds UK, featuring handcrafted engagement rings, certified fine jewelry, and exclusive diamond collections.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ever After Diamonds | Bespoke Fine Diamond Jewellers UK',
    description:
      'Luxury bespoke diamond jewelry storefront for Ever After Diamonds UK, featuring handcrafted engagement rings, certified fine jewelry, and exclusive diamond collections.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF9F5] text-[#1C1917] antialiased selection:bg-[#EADDCB] selection:text-[#382618]">
        {children}
      </body>
    </html>
  );
}

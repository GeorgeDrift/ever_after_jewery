import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ever After Diamonds | Bespoke Fine Diamond Jewellers UK',
  description:
    'Luxury bespoke diamond jewelry storefront for Ever After Diamonds UK, featuring handcrafted engagement rings, certified fine jewelry, and Shopify-ready collection.',
  openGraph: {
    title: 'Ever After Diamonds | Bespoke Fine Diamond Jewellers UK',
    description:
      'Luxury bespoke diamond jewelry storefront for Ever After Diamonds UK, featuring handcrafted engagement rings, certified fine jewelry, and Shopify-ready collection.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ever After Diamonds | Bespoke Fine Diamond Jewellers UK',
    description:
      'Luxury bespoke diamond jewelry storefront for Ever After Diamonds UK, featuring handcrafted engagement rings, certified fine jewelry, and Shopify-ready collection.',
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
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF9F5] text-[#1C1917] antialiased selection:bg-[#EADDCB] selection:text-[#382618]">
        {children}
      </body>
    </html>
  );
}

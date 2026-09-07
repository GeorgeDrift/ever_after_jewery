import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ever After Diamonds | Bespoke Fine Diamond Jewellers UK',
  description:
    'Luxury bespoke diamond jewelry storefront for Ever After Diamonds UK, featuring handcrafted engagement rings, certified fine jewelry, and exclusive diamond collections.',
  icons: {
    icon: '/ead_logo_icon.jpg',
    shortcut: '/ead_logo_icon.jpg',
    apple: '/ead_logo_icon.jpg',
  },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/ead_logo_icon.jpg" />
        <link rel="apple-touch-icon" href="/ead_logo_icon.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('ead_theme_mode');
                  var supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || ((!theme || theme === 'system') && supportDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#FAF9F5] dark:bg-[#0E0D0C] text-[#1C1917] dark:text-[#F5F2EB] antialiased selection:bg-[#EADDCB] selection:text-[#382618]">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Premium Portfolio - Luxury Digital Showcase',
  description: 'Exclusive collection of premium digital products and services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid rgba(212, 175, 55, 0.3)',
            },
            success: {
              iconTheme: {
                primary: '#D4AF37',
                secondary: '#000',
              },
            },
          }}
        />
      </body>
    </html>
  );
}

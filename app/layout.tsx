import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cadenza — Find your tempo',
  description:
    'Honest swing analysis for golfers. Multi-swing detection, real scores, longitudinal coaching.',
  openGraph: {
    title: 'Cadenza — Find your tempo',
    description: 'Honest swing analysis for golfers.',
    type: 'website',
    url: 'https://cadenzagolf.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cadenza — Find your tempo',
    description: 'Honest swing analysis for golfers.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

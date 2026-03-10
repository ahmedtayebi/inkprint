import type { Metadata } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PrintDZ — Impression T-Shirt Professionnelle en Algérie',
  description:
    'PrintDZ est votre partenaire d\'impression de t-shirts en Algérie. DTF, sérigraphie, broderie et sublimation. Livraison dans les 58 wilayas.',
  keywords: [
    'impression t-shirt algérie',
    'sérigraphie algérie',
    'DTF algérie',
    'broderie algérie',
    'commande t-shirt en gros',
    'PrintDZ',
  ],
  authors: [{ name: 'PrintDZ' }],
  openGraph: {
    title: 'PrintDZ — Impression T-Shirt Professionnelle en Algérie',
    description: 'Qualité professionnelle, livraison dans toute l\'Algérie.',
    type: 'website',
    locale: 'fr_DZ',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

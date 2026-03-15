import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Bricolage_Grotesque, Cormorant_Garamond } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { sanityFetch } from '@/lib/sanity/fetch';
import { SETTINGS_QUERY } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import '../globals.css'; // Adjust path if globals is one level up

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage'
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant'
});

export async function generateMetadata() {
  const settings = await sanityFetch<any>({ query: SETTINGS_QUERY }).catch(() => null);

  const title = settings?.heroTitle || 'SupporterFC Meilen - 50th Anniversary';
  const description = 'Celebrating 50 years of SupporterFC Meilen history, community, and unconditional support.';
  const ogImage = settings?.heroImage ? urlFor(settings.heroImage).url() : '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    }
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${bricolage.variable} ${cormorant.variable}`}>
      <body className="font-serif bg-vintage text-ink antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col relative z-0">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <NoiseOverlay />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

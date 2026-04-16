
import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Corrected import path
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { LanguageProvider } from '@/providers/language-provider';
import { CurrencyProvider } from '@/providers/currency-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster"; // Assuming Toaster is needed

const geistSans = Geist({ // Corrected usage
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Geist_Mono is not used in this iteration based on user prompt for body font.
// If needed for code blocks or specific elements, it can be added.

export const metadata: Metadata = {
  title: 'Harmony Hotels Group',
  description: 'Experience unparalleled luxury and comfort with Harmony Hotels Group.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <CurrencyProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </CurrencyProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

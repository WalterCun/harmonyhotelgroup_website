
"use client"

import Link from 'next/link';
import { useLanguage } from "@/hooks/use-language";
import type { FC } from 'react';
import { AppLogo } from '@/components/icons/app-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Facebook, Instagram, Link2, MessageSquare, HelpCircle, Info, ShieldCheck, CreditCard, Users, Mail, ShieldQuestion } from 'lucide-react';

// Simple SVG for TikTok as placeholder
const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-1.06-.6-1.9-1.44-2.46-2.45a5.96 5.96 0 0 1-1.36-3.11V11.9c.94.13 1.9.2 2.83.15.73-.03 1.44-.19 2.14-.41.69-.22 1.34-.5 1.97-.82V.02z" />
  </svg>
);

// Simple SVG for WhatsApp as placeholder
const WhatsAppIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.712-1.001z"/>
  </svg>
);


export const Footer: FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/about", labelKey: "footer_about_us" },
    { href: "/hotels", labelKey: "nav_hotels" },
    { href: "/#destinations", labelKey: "nav_destinations" },
    { href: "/#offers", labelKey: "nav_offers" },
    { href: "/#blog", labelKey: "nav_blog" },
    { href: "/#contact", labelKey: "nav_contact" },
    { href: "/privacy", labelKey: "footer_privacy_policy" },
    { href: "/terms", labelKey: "footer_terms_of_service" },
  ];

  const faqLinks = [
    { href: "/faq/reservations", labelKey: "footer_reservations" },
    { href: "/faq/cancellation", labelKey: "footer_cancellation_policy" },
    { href: "/faq/loyalty", labelKey: "footer_loyalty_program" },
    { href: "/faq/payment", labelKey: "footer_payment_methods" },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-y-10 gap-x-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Harmony Hotel Group Info */}
          <div className="space-y-4">
            <AppLogo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer_description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
                <TikTokIcon />
              </a>
              <a href="#" aria-label="WhatsApp" className="text-muted-foreground hover:text-primary transition-colors">
                <WhatsAppIcon />
              </a>
            </div>
            <Button asChild variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary/5 hover:text-primary">
              <Link href="https://example.com/harmony-hotel-group-official" target="_blank" rel="noopener noreferrer">
                <Link2 className="mr-2 h-4 w-4" />
                {t('footer_official_site_button')}
              </Link>
            </Button>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-md font-semibold text-foreground tracking-wider uppercase mb-4">{t('footer_quick_links')}</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.labelKey}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: FAQs */}
          <div>
            <h3 className="text-md font-semibold text-foreground tracking-wider uppercase mb-4">{t('footer_faqs')}</h3>
            <ul className="space-y-2">
              {faqLinks.map(link => (
                <li key={link.labelKey}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us Form */}
          <div>
            <h3 className="text-md font-semibold text-foreground tracking-wider uppercase mb-4">{t('footer_contact_us')}</h3>
            <form className="space-y-4">
              <div>
                <Label htmlFor="footer-email" className="sr-only">{t('footer_contact_email_label')}</Label>
                <Input type="email" id="footer-email" placeholder={t('footer_contact_email_placeholder')} className="bg-background" />
              </div>
              <div>
                <Label htmlFor="footer-message" className="sr-only">{t('footer_contact_message_label')}</Label>
                <Textarea id="footer-message" placeholder={t('footer_contact_message_placeholder')} rows={4} className="bg-background" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {t('footer_contact_send_button')}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-muted-foreground">
          <p>{t('footer_copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};

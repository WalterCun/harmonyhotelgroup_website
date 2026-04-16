
"use client";

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { Gift, Award, CreditCard, ChevronRight, Ticket, Utensils } from "lucide-react";
import Link from 'next/link';

export default function LoyaltyPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {t('loyalty_page_title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('loyalty_page_subtitle')}
        </p>
      </header>

      {/* Changed from lg:grid-cols-4 to md:grid-cols-2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Gift Card Section */}
        <Card className="shadow-lg flex flex-col">
          <CardHeader className="items-center">
            <Gift className="w-12 h-12 text-primary mb-3" />
            <CardTitle className="text-2xl text-center text-primary">{t('loyalty_gift_card_title')}</CardTitle>
            <CardDescription className="text-center">{t('loyalty_gift_card_subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 text-center">
            <div className="relative w-full h-48 rounded-md overflow-hidden my-4">
              <Image
                src="https://placehold.co/600x300.png"
                alt={t('loyalty_gift_card_alt')}
                layout="fill"
                objectFit="cover"
                data-ai-hint="gift card elegant"
              />
            </div>
            <p className="text-muted-foreground">{t('loyalty_gift_card_desc')}</p>
            <ul className="list-disc list-inside text-left space-y-1 text-sm text-muted-foreground pl-4">
              <li>{t('loyalty_gift_card_benefit1')}</li>
              <li>{t('loyalty_gift_card_benefit2')}</li>
              <li>{t('loyalty_gift_card_benefit3')}</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <CreditCard className="mr-2 h-5 w-5" />
              {t('loyalty_gift_card_cta')}
            </Button>
          </CardFooter>
        </Card>

        {/* Fidelity Tickets Section */}
        <Card className="shadow-lg flex flex-col">
          <CardHeader className="items-center">
            <Ticket className="w-12 h-12 text-primary mb-3" />
            <CardTitle className="text-2xl text-center text-primary">{t('loyalty_tickets_title')}</CardTitle>
            <CardDescription className="text-center">{t('loyalty_tickets_subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 text-center">
             <div className="relative w-full h-48 rounded-md overflow-hidden my-4">
              <Image
                src="https://placehold.co/600x300.png"
                alt={t('loyalty_tickets_alt')}
                layout="fill"
                objectFit="cover"
                data-ai-hint="loyalty tickets stack"
              />
            </div>
            <p className="text-muted-foreground">{t('loyalty_tickets_desc')}</p>
            <ul className="list-disc list-inside text-left space-y-1 text-sm text-muted-foreground pl-4">
              <li>{t('loyalty_tickets_benefit1')}</li>
              <li>{t('loyalty_tickets_benefit2')}</li>
              <li>{t('loyalty_tickets_benefit3')}</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <ChevronRight className="mr-2 h-5 w-5" />
              {t('loyalty_tickets_cta')}
            </Button>
          </CardFooter>
        </Card>

        {/* Fidelity Passport Section */}
        <Card className="shadow-lg flex flex-col">
          <CardHeader className="items-center">
            <Award className="w-12 h-12 text-primary mb-3" />
            <CardTitle className="text-2xl text-center text-primary">{t('loyalty_passport_title')}</CardTitle>
            <CardDescription className="text-center">{t('loyalty_passport_subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 text-center">
             <div className="relative w-full h-48 rounded-md overflow-hidden my-4">
              <Image
                src="https://placehold.co/600x300.png"
                alt={t('loyalty_passport_alt')}
                layout="fill"
                objectFit="cover"
                data-ai-hint="travel passport stamps"
              />
            </div>
            <p className="text-muted-foreground">{t('loyalty_passport_desc')}</p>
            <p className="font-semibold text-foreground/90">{t('loyalty_passport_benefits_intro')}</p>
            <ul className="list-disc list-inside text-left space-y-1 text-sm text-muted-foreground pl-4">
              <li>{t('loyalty_passport_benefit1')}</li>
              <li>{t('loyalty_passport_benefit2')}</li>
              <li>{t('loyalty_passport_benefit3')}</li>
              <li>{t('loyalty_passport_benefit4')}</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <ChevronRight className="mr-2 h-5 w-5" />
              {t('loyalty_passport_cta')}
            </Button>
          </CardFooter>
        </Card>

        {/* Restaurant Scratch Cards Section */}
        <Card className="shadow-lg flex flex-col">
          <CardHeader className="items-center">
            <Utensils className="w-12 h-12 text-primary mb-3" />
            <CardTitle className="text-2xl text-center text-primary">{t('loyalty_scratch_cards_title')}</CardTitle>
            <CardDescription className="text-center">{t('loyalty_scratch_cards_subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4 text-center">
             <div className="relative w-full h-48 rounded-md overflow-hidden my-4">
              <Image
                src="https://placehold.co/600x300.png"
                alt={t('loyalty_scratch_cards_alt')}
                layout="fill"
                objectFit="cover"
                data-ai-hint="scratch card game"
              />
            </div>
            <p className="text-muted-foreground">{t('loyalty_scratch_cards_desc')}</p>
            <ul className="list-disc list-inside text-left space-y-1 text-sm text-muted-foreground pl-4">
              <li>{t('loyalty_scratch_cards_benefit1')}</li>
              <li>{t('loyalty_scratch_cards_benefit2')}</li>
              <li>{t('loyalty_scratch_cards_benefit3')}</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <ChevronRight className="mr-2 h-5 w-5" />
              {t('loyalty_scratch_cards_cta')}
            </Button>
          </CardFooter>
        </Card>
      </div>
        <div className="text-center mt-12">
            <Button asChild variant="outline">
                <Link href="/">{t('btn_back_to_home')}</Link>
            </Button>
        </div>
    </div>
  );
}

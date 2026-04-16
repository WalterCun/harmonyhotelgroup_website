
"use client";

import Image from 'next/image';
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tag } from 'lucide-react';
import Link from "next/link";
import { specialOffersData, type Offer } from '@/lib/mock-data'; // Assuming Offer type is exported

export default function OffersPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {t('page_title_offers')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('special_offers_subtitle')} {/* Reusing existing key if appropriate */}
        </p>
      </header>

      {specialOffersData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {specialOffersData.map((offer) => (
            <Card key={offer.id} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
              <div className="relative h-56 w-full">
                <Image
                  src={offer.image}
                  alt={t(offer.titleKey, offer.title)}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={offer.dataAiHint}
                />
                {offer.discount && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1.5 text-sm font-semibold m-2 rounded-md shadow-md">
                    {offer.discount}
                  </div>
                )}
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-primary group-hover:text-accent transition-colors">
                  {t(offer.titleKey, offer.title)}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-foreground/80 leading-relaxed">
                  {t(offer.descriptionKey, offer.description)}
                </CardDescription>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                {/* For now, CTA buttons on this page won't do anything specific, but could link to hotel pages or contact */}
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Tag size={18} className="mr-2" /> {t(offer.ctaKey, offer.cta)}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">{t('ai_results_no_results')}</p> {/* Reusing no results key */}
        </div>
      )}
        <div className="text-center mt-12">
            <Button asChild variant="outline">
                <Link href="/">{t('btn_back_to_home')}</Link>
            </Button>
        </div>
    </div>
  );
}

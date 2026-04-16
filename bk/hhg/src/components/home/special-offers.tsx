
"use client"

import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';

interface Offer {
  id: string;
  titleKey: string;
  title: string;
  descriptionKey: string;
  description: string;
  image: string;
  discount?: string; // e.g., "Up to 30% Off"
  ctaKey: string;
  cta: string;
  dataAiHint: string;
}

const specialOffersData: Offer[] = [
  {
    id: 'summer-escape',
    titleKey: 'offer_summer_title',
    title: 'Summer Escape',
    descriptionKey: 'offer_summer_desc',
    description: 'Enjoy sunny beaches and cool breezes with our exclusive summer package. Includes breakfast and spa credits.',
    image: 'https://placehold.co/600x400.png',
    discount: 'Up to 25% Off',
    ctaKey: 'offer_cta_learn_more',
    cta: 'Learn More',
    dataAiHint: 'beach resort summer'
  },
  {
    id: 'city-adventure',
    titleKey: 'offer_city_title',
    title: 'City Adventure',
    descriptionKey: 'offer_city_desc',
    description: 'Explore vibrant cityscapes with our special offer. Centrally located hotels, perfect for your urban exploration.',
    image: 'https://placehold.co/600x400.png',
    discount: 'Stay 3, Pay 2',
    ctaKey: 'offer_cta_discover',
    cta: 'Discover Now',
    dataAiHint: 'city skyline modern'
  },
  {
    id: 'wellness-retreat',
    titleKey: 'offer_wellness_title',
    title: 'Wellness Retreat',
    descriptionKey: 'offer_wellness_desc',
    description: 'Rejuvenate your mind and body with our wellness packages. Includes yoga sessions and healthy meals.',
    image: 'https://placehold.co/600x400.png',
    ctaKey: 'offer_cta_book_retreat',
    cta: 'Book Retreat',
    dataAiHint: 'spa yoga serene'
  },
];

export function SpecialOffers() {
  const { t } = useLanguage();

  return (
    <section id="offers" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            {t('special_offers_title')}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('special_offers_subtitle')}
          </p>
        </div>
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
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Tag size={18} className="mr-2" /> {t(offer.ctaKey, offer.cta)}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


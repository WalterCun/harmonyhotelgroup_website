
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardFooter } from '@/components/ui/card'; 
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Hotel as HotelIcon, Search } from 'lucide-react'; 
import { popularDestinationsData } from '@/lib/mock-data'; // Updated import path

export function PopularDestinations() {
  const { t } = useLanguage();
  // Display a limited number of destinations on the homepage, e.g., first 4
  const homepageDestinations = popularDestinationsData.slice(0, 4);


  return (
    <section id="destinations" className="py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            {t('popular_destinations_title')}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('popular_destinations_subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {homepageDestinations.map((destination) => (
            <Card key={destination.id} className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 group flex flex-col">
              <div className="relative h-56 w-full">
                <Image
                  src={destination.image}
                  alt={t(destination.nameKey, destination.name)}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={destination.dataAiHint}
                />
              </div>
              <CardContent className="p-4 space-y-2 flex flex-col flex-grow">
                <Badge variant="secondary" className="self-start text-xs">
                  {t(destination.tagKey, destination.tag)}
                </Badge>
                <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                  {t(destination.nameKey, destination.name)}
                </h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center">
                    <MapPin size={14} className="mr-1.5 text-primary/70" />
                    {t(destination.countryKey, destination.country)}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <HotelIcon size={12} className="mr-1.5 text-primary/70" />
                    {destination.nearbyHotelsCount > 0 ? 
                      t(destination.nearbyHotelsCount === 1 ? 'destination_nearby_hotels_singular' : 'destination_nearby_hotels_plural', { count: destination.nearbyHotelsCount })
                      : t('destination_no_nearby_hotels')
                    }
                  </p>
                </div>
                <p className="text-xs text-foreground/80 flex-grow pt-1">
                  {t(destination.descriptionKey, destination.description)}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href={`/hotels?location=${encodeURIComponent(t(destination.nameKey, destination.name))}`}>
                    <Search size={18} className="mr-2" />
                    {t('btn_explore_destination')}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {popularDestinationsData.length > 0 && (
          <div className="mt-10 md:mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:text-primary">
              <Link href="/destinations">
                {t('btn_view_all_destinations')}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

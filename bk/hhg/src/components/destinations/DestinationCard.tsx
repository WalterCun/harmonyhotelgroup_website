
"use client"

import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Hotel as HotelIcon, Search } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import type { Destination } from '@/lib/mock-data';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: FC<DestinationCardProps> = ({ destination }) => {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 group flex flex-col h-full">
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
        <p className="text-xs text-foreground/80 flex-grow pt-1 line-clamp-3">
          {t(destination.descriptionKey, destination.description)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto"> {/* mt-auto pushes footer to bottom */}
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/hotels?location=${encodeURIComponent(t(destination.nameKey, destination.name))}`}>
            <Search size={18} className="mr-2" />
            {t('btn_explore_destination')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

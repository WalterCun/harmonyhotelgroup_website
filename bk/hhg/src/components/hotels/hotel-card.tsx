
"use client"

import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { Star, MapPin, ShieldCheck } from 'lucide-react'; // Added ShieldCheck for strategic partner
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Hotel } from '@/lib/mock-data';
import { useCurrency } from '@/hooks/use-currency';
import { useLanguage } from '@/hooks/use-language';

interface HotelCardProps {
  hotel: Hotel;
}

export const HotelCard: FC<HotelCardProps> = ({ hotel }) => {
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();

  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-primary/20 flex flex-col">
      <div className="relative w-full h-56">
        <Image
          src={hotel.images[0]}
          alt={hotel.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={`${hotel.location.split(',')[0].toLowerCase()} hotel exterior`}
        />
        {hotel.isStrategicPartner && (
          <Badge 
            variant="default" // Or "destructive" or another color for emphasis
            className="absolute top-2 right-2 flex items-center gap-1 bg-primary text-primary-foreground shadow-md"
          >
            <ShieldCheck size={14} />
            {t('hotel_strategic_partner')}
          </Badge>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-primary mb-1 truncate">{hotel.name}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 mr-1.5 text-primary/70" />
          <span>{hotel.location}</span>
        </div>
        
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < Math.round(hotel.rating) ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`}
            />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">{hotel.rating.toFixed(1)} {t('rating')}</span>
        </div>

        <div className="mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="mr-1.5 mb-1.5 text-xs">
              {amenity}
            </Badge>
          ))}
          {hotel.amenities.length > 3 && (
            <Badge variant="outline" className="mr-1.5 mb-1.5 text-xs">
              +{hotel.amenities.length - 3} {t('more_amenities')}
            </Badge>
          )}
        </div>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-foreground">
              {formatPrice(hotel.pricePerNight, hotel.baseCurrency)}
              <span className="text-xs text-muted-foreground ml-1">/{t('per_night')}</span>
            </p>
          </div>
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={`/hotels/${hotel.id}`}>{t('btn_view_details')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

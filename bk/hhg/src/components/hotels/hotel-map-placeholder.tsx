
import Image from 'next/image';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface HotelMapPlaceholderProps {
  locationName: string;
}

export const HotelMapPlaceholder: FC<HotelMapPlaceholderProps> = ({ locationName }) => {
  return (
    <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-md">
      <Image
        src="https://placehold.co/800x450.png"
        alt={`Map of ${locationName}`}
        layout="fill"
        objectFit="cover"
        data-ai-hint="map location city"
      />
      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4">
        <MapPin className="w-12 h-12 text-white mb-4 drop-shadow-lg" />
        <p className="text-white text-xl font-semibold text-center mb-4 drop-shadow-lg">
          Location of {locationName}
        </p>
        <Button variant="secondary" className="bg-white/80 hover:bg-white text-primary">
          View on Interactive Map (Coming Soon)
        </Button>
      </div>
    </div>
  );
};


"use client"

import Image from 'next/image';
import type { FC } from 'react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HotelGalleryProps {
  images: string[];
  hotelName: string;
}

export const HotelGallery: FC<HotelGalleryProps> = ({ images, hotelName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-6 text-center text-muted-foreground">
          No images available.
        </CardContent>
      </Card>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Card className="shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[16/10]">
          <Image
            src={images[currentIndex]}
            alt={`${hotelName} - Image ${currentIndex + 1}`}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-500 ease-in-out"
            data-ai-hint="hotel room interior"
          />
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex justify-center p-2 bg-background/50 space-x-1.5 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`View image ${index + 1}`}
                className={cn(
                  "h-16 w-24 rounded-md overflow-hidden border-2 transition-all",
                  index === currentIndex ? "border-primary scale-105" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={96}
                  height={64}
                  objectFit="cover"
                  className="w-full h-full"
                />
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

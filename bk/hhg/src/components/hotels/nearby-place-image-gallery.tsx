
"use client";

import Image from 'next/image';
import { useState, type FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NearbyPlaceImageGalleryProps {
  images: string[];
  altText: string;
  dataAiHint?: string;
  className?: string;
}

export const NearbyPlaceImageGallery: FC<NearbyPlaceImageGalleryProps> = ({
  images,
  altText,
  dataAiHint,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    // Fallback if no images are provided, though the data structure now requires it
    return (
      <div className={cn("relative w-full bg-muted flex items-center justify-center text-xs text-muted-foreground", className)}>
        No image
      </div>
    );
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click or other underlying actions
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className={cn("relative w-full overflow-hidden group", className)}>
      <Image
        src={images[currentIndex]}
        alt={`${altText} - Image ${currentIndex + 1}`}
        layout="fill"
        objectFit="cover"
        className="transition-opacity duration-300 ease-in-out"
        data-ai-hint={dataAiHint}
      />
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                }}
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/75"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

    
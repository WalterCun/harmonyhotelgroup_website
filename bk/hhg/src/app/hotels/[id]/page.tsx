
"use client"

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { mockHotels, type Hotel, type NearbyPlace, type Tour } from '@/lib/mock-data';
import { HotelGallery } from '@/components/hotels/hotel-gallery';
import { HotelMapPlaceholder } from '@/components/hotels/hotel-map-placeholder';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Star, MapPin, CheckCircle, Utensils, Wifi, MessageSquare, ExternalLink,
  Dumbbell, PawPrint, Waves, Umbrella, ConciergeBell, Landmark, MountainSnow, Bath, Flame, Wine,
  Sparkles, Sailboat, ClipboardList, Trees, ShoppingBag, Coffee, Drama, Building, Route, Info, Map as MapIconLucide
} from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useCurrency } from '@/hooks/use-currency';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NearbyPlaceImageGallery } from '@/components/hotels/nearby-place-image-gallery'; // Added import

const amenityIcons: Record<string, React.ElementType> = {
  'Free WiFi': Wifi,
  'Pool': Waves,
  'Spa': Sparkles,
  'Gym': Dumbbell,
  'Restaurant': Utensils,
  'Room Service': ConciergeBell,
  'Pet Friendly': PawPrint,
  'Private Beach': Umbrella,
  'Water Sports': Sailboat,
  'Rooftop Bar': Wine,
  'Concierge': ClipboardList,
  'City Views': Landmark,
  'Ski-in/Ski-out': MountainSnow,
  'Hot Tub': Bath,
  'Fireplace': Flame,
  'Default': CheckCircle,
};

const defaultNearbyPlaceIcon = MapIconLucide;
const defaultTourIcon = Route;

export default function HotelDetailsPage() {
  const params = useParams();
  const { id } = params;
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const { toast } = useToast();

  const [hotel, setHotel] = useState<Hotel | null | undefined>(undefined);

  useEffect(() => {
    const foundHotel = mockHotels.find(h => h.id === id);
    setTimeout(() => {
      setHotel(foundHotel);
    }, 300);
  }, [id]);

  const handleWhatsAppBooking = () => {
    if (!hotel || !hotel.whatsappNumber) {
      toast({
        title: t('toast_error_title'),
        description: "WhatsApp number for this hotel is not available.",
        variant: "destructive",
      });
      return;
    }

    const message = t('hotel_details_whatsapp_message', { hotelName: hotel.name });
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${hotel.whatsappNumber}?text=${encodedMessage}`;

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, '_blank');
      toast({
        title: t('hotel_details_whatsapp_toast_title'),
        description: t('hotel_details_whatsapp_toast_description'),
      });
    }
  };

  const handleTourInquiryViaWhatsApp = (tourName: string) => {
    if (!hotel || !hotel.whatsappNumber) {
      toast({
        title: t('toast_error_title'),
        description: "WhatsApp number for this hotel is not available.",
        variant: "destructive",
      });
      return;
    }

    const message = t('hotel_details_tour_whatsapp_message', { tourName: tourName, hotelName: hotel.name });
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${hotel.whatsappNumber}?text=${encodedMessage}`;

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, '_blank');
      toast({
        title: t('hotel_details_tour_whatsapp_toast_title'),
        description: t('hotel_details_tour_whatsapp_toast_description', { tourName: tourName }),
      });
    }
  };


  if (hotel === undefined) {
    return (
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-5xl space-y-8">
        <Skeleton className="h-12 w-3/4 rounded-lg" />
        <Skeleton className="h-[400px] w-full rounded-lg" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-semibold">Hotel not found</h1>
        <p className="text-muted-foreground mt-2">
          The hotel you are looking for does not exist or could not be loaded.
        </p>
        <Button asChild className="mt-6">
          <Link href="/hotels">Back to Hotels</Link>
        </Button>
      </div>
    );
  }

  const officialSiteUrl = hotel.officialSiteUrl || "/#";


  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-2">{hotel.name}</h1>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-5 h-5 mr-2 text-primary/80" />
          <span>{hotel.location}</span>
          <span className="mx-2">·</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.round(hotel.rating) ? 'text-primary fill-primary' : 'text-muted-foreground/50'}`}
              />
            ))}
            <span className="ml-2">{hotel.rating.toFixed(1)} {t('rating')}</span>
          </div>
        </div>
      </header>

      <HotelGallery images={hotel.gallery || hotel.images} hotelName={hotel.name} />

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          <Card className="shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{t('Description')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed">{hotel.description}</p>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-1">
           <Card className="shadow-lg h-full">
            <CardHeader>
                <CardTitle className="text-xl text-primary">{t('Reserve Your Stay')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-foreground">
                {formatPrice(hotel.pricePerNight, hotel.baseCurrency)}
                <span className="text-sm font-normal text-muted-foreground ml-1">/{t('per_night')}</span>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleWhatsAppBooking}
                >
                  <MessageSquare className="mr-2 h-5 w-5" /> {t('hotel_details_book_now')}
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/5"
                >
                  <Link href={officialSiteUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-5 w-5" /> {t('hotel_details_visit_official_site')}
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center">{t('hotel_details_booking_note')}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">{t('hotel_details_amenities')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5">
            {hotel.amenities.map(amenity => {
              const IconComponent = amenityIcons[amenity] || amenityIcons['Default'];
              return (
                <li key={amenity} className="flex items-center">
                  <IconComponent className="w-6 h-6 mr-3 text-primary" />
                  <span className="text-md text-foreground/90">{amenity}</span>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      {hotel.nearbyPlaces && hotel.nearbyPlaces.length > 0 && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">{t('hotel_details_nearby_places_title')}</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 px-0 sm:px-6">
             <Carousel
              opts={{
                align: "start",
                loop: hotel.nearbyPlaces.length > 2,
              }}
              className="w-full max-w-none"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {hotel.nearbyPlaces.map((place, index) => {
                  const PlaceIcon = place.icon || defaultNearbyPlaceIcon;
                  const mapsQuery = encodeURIComponent(`${place.name}, ${hotel.location}`);
                  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
                  return (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2">
                      <div className="p-1 h-full">
                        <div className="bg-card border border-border rounded-lg shadow-md p-4 h-full flex flex-col hover:shadow-primary/10 transition-shadow group">
                          <NearbyPlaceImageGallery
                            images={place.images}
                            altText={place.name}
                            dataAiHint={place.dataAiHint}
                            className="h-56 w-full mb-3 rounded-md"
                          />
                          <div className="flex items-center mb-1">
                            <PlaceIcon className="w-5 h-5 mr-2 text-primary/80 flex-shrink-0" />
                            <a
                              href={mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-md text-foreground/90 hover:text-primary hover:underline inline-flex items-center group truncate"
                              title={place.name}
                            >
                              {place.name}
                              <ExternalLink className="w-3 h-3 ml-1.5 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                            </a>
                          </div>
                          <p className="text-sm text-muted-foreground truncate" title={place.type}>
                            {place.type}
                          </p>
                          {place.distance && (
                            <p className="text-xs text-muted-foreground/80 mt-0.5">({place.distance})</p>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              {hotel.nearbyPlaces.length > 1 && (
                <>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </>
              )}
            </Carousel>
          </CardContent>
        </Card>
      )}

      {hotel.availableTours && hotel.availableTours.length > 0 && (
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">{t('hotel_details_available_tours_title')}</CardTitle>
          </CardHeader>
          <CardContent className="pb-4 px-0 sm:px-6">
            <Carousel
              opts={{
                align: "start",
                loop: hotel.availableTours.length > 2,
              }}
              className="w-full max-w-none"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {hotel.availableTours.map((tour, index) => {
                  const TourIcon = tour.icon || defaultTourIcon;
                  return (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2">
                       <div className="p-1 h-full">
                        <div className="bg-card border border-border rounded-lg shadow-md p-4 h-full flex flex-col hover:shadow-primary/10 transition-shadow group">
                          <div className="relative h-56 w-full mb-3 rounded-md overflow-hidden">
                            <Image
                              src={tour.image}
                              alt={tour.name}
                              layout="fill"
                              objectFit="cover"
                              data-ai-hint={tour.dataAiHint}
                              className="transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="flex items-start mb-2">
                            <TourIcon className="w-6 h-6 mr-3 mt-1 text-primary/80 flex-shrink-0" />
                            <div>
                              <button
                                onClick={() => handleTourInquiryViaWhatsApp(tour.name)}
                                className="font-semibold text-lg text-foreground/90 hover:text-primary hover:underline inline-flex items-center group text-left p-0 bg-transparent border-none"
                                aria-label={`${t('hotel_details_inquire_tour_aria_label')} ${tour.name}`}
                              >
                                {tour.name}
                                <MessageSquare className="w-3.5 h-3.5 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                              </button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1 flex-grow">{tour.description}</p>
                          {tour.details && (
                            <p className="text-xs text-muted-foreground/80 mt-auto">{tour.details}</p>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              {hotel.availableTours.length > 1 && (
                <>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </>
              )}
            </Carousel>
          </CardContent>
        </Card>
      )}

      <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-primary">{t('hotel_details_map')}</CardTitle>
        </CardHeader>
        <CardContent>
          <HotelMapPlaceholder locationName={hotel.location} />
        </CardContent>
      </Card>
    </div>
  );
}

    

"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import { BookingForm } from '@/components/home/booking-form';
import { HotelCard } from '@/components/hotels/hotel-card';
import { mockHotels } from '@/lib/mock-data';
import { PopularDestinations } from '@/components/home/popular-destinations';
import { SpecialOffers } from '@/components/home/special-offers';
import { LatestReviews } from '@/components/home/latest-reviews';
import { SubscriptionForm } from '@/components/home/subscription-form';

export default function HomePage() {
  const { t } = useLanguage();
  const featuredHotels = mockHotels.slice(0, 3);

  return (
    <>
      <div className="relative flex flex-col items-center justify-start min-h-[calc(100vh-5rem)]"> {/* 5rem is approx header height */}
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            alt={t('hero_alt_tropical_resort')}
            src="https://placehold.co/1920x1080.png"
            data-ai-hint="tropical resort pool"
            layout="fill"
            objectFit="cover"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
        </div>

        {/* Hero Content */}
        <section className="relative z-10 w-full pt-20 md:pt-28 lg:pt-32 text-center text-white">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl drop-shadow-md">
              {t('hero_title_main')}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 drop-shadow-sm">
              {t('hero_subtitle_main')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                <Link href="/hotels">
                  {t('hero_cta_view_hotels')}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white text-primary border-primary hover:bg-neutral-100 shadow-lg">
                <Link href="/#offers">
                  {t('hero_cta_special_offers')}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="relative z-10 w-full mt-12 md:mt-16 lg:mt-20 pb-12 px-4">
          <div className="container max-w-4xl mx-auto">
             <BookingForm />
          </div>
        </section>
      </div>

      {/* Featured Hotels Section */}
      <section id="featured-hotels" className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              {t('featured_hotels_title')}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('featured_hotels_subtitle')}
            </p>
          </div>
          {featuredHotels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
              {featuredHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">{t('no_featured_hotels')}</p>
          )}
          {featuredHotels.length > 0 && (
            <div className="mt-10 md:mt-12 text-center">
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:text-primary">
                <Link href="/hotels">
                  {t('btn_view_all_hotels')}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Popular Destinations Section */}
      <PopularDestinations />

      {/* Special Offers Section */}
      <SpecialOffers />

      {/* Latest Reviews Section */}
      <LatestReviews />

      {/* Subscription Form Section */}
      <SubscriptionForm />

    </>
  );
}

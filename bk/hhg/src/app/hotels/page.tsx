
"use client"

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HotelCard } from '@/components/hotels/hotel-card';
import { HotelFilters, type HotelFiltersType } from '@/components/hotels/hotel-filters';
import { mockHotels, type Hotel } from '@/lib/mock-data';
import { useLanguage } from '@/hooks/use-language';
import { exchangeRates, type Currency } from '@/lib/constants';
import { useCurrency } from '@/hooks/use-currency';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Helper function to convert price to USD for consistent filtering
const convertToUSD = (price: number, currency: Currency): number => {
  return price / exchangeRates[currency];
};

const ITEMS_PER_PAGE = 6;

export default function HotelsPage() {
  const { t } = useLanguage();
  const { currency: displayCurrency } = useCurrency();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueLocations = useMemo(() =>
    Array.from(new Set(mockHotels.map(hotel => hotel.location))).sort()
  , []);

  const maxPriceUSD = useMemo(() =>
    Math.max(...mockHotels.map(hotel => convertToUSD(hotel.pricePerNight, hotel.baseCurrency)))
  , []);

  const maxPriceDisplayCurrency = useMemo(() => {
    return maxPriceUSD * exchangeRates[displayCurrency];
  }, [maxPriceUSD, displayCurrency]);

  const getInitialFilters = (): HotelFiltersType => {
    const locationFromQuery = searchParams.get('location') || '';
    const priceFromQuery = searchParams.get('price_from');
    const priceToQuery = searchParams.get('price_to');
    const amenitiesQuery = searchParams.get('amenities');

    let initialPriceRange: [number, number] = [0, maxPriceDisplayCurrency];
    if (priceFromQuery !== null && priceToQuery !== null) {
      initialPriceRange = [
        parseFloat(priceFromQuery),
        parseFloat(priceToQuery)
      ];
      initialPriceRange[0] = Math.max(0, Math.min(initialPriceRange[0], maxPriceDisplayCurrency));
      initialPriceRange[1] = Math.max(initialPriceRange[0], Math.min(initialPriceRange[1], maxPriceDisplayCurrency));
    }

    return {
      location: locationFromQuery,
      priceRange: initialPriceRange,
      amenities: amenitiesQuery ? amenitiesQuery.split(',') : [],
    };
  };

  const [filters, setFilters] = useState<HotelFiltersType>(getInitialFilters);

   useEffect(() => {
    const newFilters = getInitialFilters();
    // Only update filters if they are different from current state to avoid infinite loops with router.push
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
        setFilters(newFilters);
        setCurrentPage(1); // Reset to first page if filters change via URL
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, maxPriceDisplayCurrency]); 

  const handleFilterChange = (newFilters: HotelFiltersType) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on new filter application
    const params = new URLSearchParams(searchParams.toString()); 
    
    if (newFilters.location) {
      params.set('location', newFilters.location);
    } else {
      params.delete('location');
    }

    if (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < maxPriceDisplayCurrency) {
      params.set('price_from', newFilters.priceRange[0].toString());
      params.set('price_to', newFilters.priceRange[1].toString());
    } else {
      params.delete('price_from');
      params.delete('price_to');
    }

    if (newFilters.amenities.length > 0) {
      params.set('amenities', newFilters.amenities.join(','));
    } else {
      params.delete('amenities');
    }
    
    const queryString = params.toString();
    router.push(`/hotels${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  const filteredHotels = useMemo(() => {
    return mockHotels.filter(hotel => {
      const hotelPriceUSD = convertToUSD(hotel.pricePerNight, hotel.baseCurrency);
      const filterPriceRangeUSD: [number, number] = [
        convertToUSD(filters.priceRange[0], displayCurrency),
        convertToUSD(filters.priceRange[1], displayCurrency)
      ];

      const matchesLocation = filters.location === '' || hotel.location === filters.location;
      const matchesPrice = hotelPriceUSD >= filterPriceRangeUSD[0] && hotelPriceUSD <= filterPriceRangeUSD[1];
      const matchesAmenities = filters.amenities.every(amenity => hotel.amenities.includes(amenity));

      return matchesLocation && matchesPrice && matchesAmenities;
    });
  }, [filters, displayCurrency]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const totalPages = Math.ceil(filteredHotels.length / ITEMS_PER_PAGE);

  const paginatedHotels = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredHotels.slice(startIndex, endIndex);
  }, [filteredHotels, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const getPaginationItems = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow + 2) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        pageNumbers.push(1);
        if (currentPage > halfPagesToShow + 2) {
            pageNumbers.push(-1); // Ellipsis marker
        }

        let startPage = Math.max(2, currentPage - halfPagesToShow);
        let endPage = Math.min(totalPages - 1, currentPage + halfPagesToShow);

        if (currentPage <= halfPagesToShow +1 ) {
            endPage = Math.min(totalPages - 1, maxPagesToShow -1);
        }

        if (currentPage >= totalPages - halfPagesToShow) {
            startPage = Math.max(2, totalPages - maxPagesToShow + 2);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        if (currentPage < totalPages - halfPagesToShow -1 && endPage < totalPages -1) {
            pageNumbers.push(-1); // Ellipsis marker
        }
        pageNumbers.push(totalPages);
    }
    return pageNumbers.filter((value, index, self) => {
        if (value === -1) return self.indexOf(value) === index || self.indexOf(value, index + 1) === -1 || self[index-1] !== -1 ;
        return self.indexOf(value) === index;
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <h1 className="text-4xl font-bold tracking-tight text-primary mb-10 text-center">
        {t('hotels_title')}
      </h1>
      
      <div className="mb-8"> {/* Container for filters */}
        <HotelFilters
          onFilterChange={handleFilterChange}
          initialFilters={filters} 
          maxPrice={maxPriceDisplayCurrency}
          availableLocations={uniqueLocations}
        />
      </div>

      <div> {/* Container for hotel list and pagination */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl shadow-lg overflow-hidden">
                <Skeleton className="w-full h-56" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : paginatedHotels.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedHotels.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                      aria-disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  {getPaginationItems().map((page, index) =>
                    page === -1 ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                      aria-disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        ) : (
          <div className="text-center py-10 col-span-full">
            <p className="text-xl text-muted-foreground">{t('ai_results_no_results')}</p>
          </div>
        )}
      </div>
    </div>
  );
}



"use client";

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { popularDestinationsData, type Destination } from '@/lib/mock-data';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { DestinationFilters } from '@/components/destinations/DestinationFilters';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLanguage } from '@/hooks/use-language';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react'; // Ensure Search is imported if used

const ITEMS_PER_PAGE = 12;

function DestinationsContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const initialSearchTermFromUrl = searchParams.get('location') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTermFromUrl);
  const [currentPage, setCurrentPage] = useState(1);

  // Update searchTerm if URL query param changes (e.g. back/forward navigation)
  useEffect(() => {
    const newSearchTermFromUrl = searchParams.get('location') || '';
    if (newSearchTermFromUrl !== searchTerm) {
      setSearchTerm(newSearchTermFromUrl);
      setCurrentPage(1); // Reset to first page on new search term from URL
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // Rerun when searchParams object itself changes

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredDestinations = useMemo(() => {
    let destinations = popularDestinationsData;
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      destinations = destinations.filter(dest =>
        t(dest.nameKey, dest.name).toLowerCase().includes(lowerSearchTerm) ||
        t(dest.countryKey, dest.country).toLowerCase().includes(lowerSearchTerm) ||
        t(dest.tagKey, dest.tag).toLowerCase().includes(lowerSearchTerm) ||
        t(dest.descriptionKey, dest.description).toLowerCase().includes(lowerSearchTerm)
      );
    }
    return destinations;
  }, [searchTerm, t]);

  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);

  const paginatedDestinations = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredDestinations.slice(startIndex, endIndex);
  }, [filteredDestinations, currentPage]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

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
    return pageNumbers.filter((value, index, self) => { // Remove duplicate ellipsis or page numbers
        if (value === -1) return self.indexOf(value) === index || self.indexOf(value, index + 1) === -1 || self[index-1] !== -1 ;
        return self.indexOf(value) === index;
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {t('page_title_destinations')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('destinations_page_subtitle')}
        </p>
      </header>

      <DestinationFilters onSearchChange={handleSearchChange} initialSearchTerm={searchTerm} />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div key={i} className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col">
                <Skeleton className="w-full h-56" />
                <div className="p-4 space-y-3 flex-grow flex flex-col">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-10 w-full mt-auto" />
                </div>
            </div>
          ))}
        </div>
      ) : paginatedDestinations.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedDestinations.map(destination => (
              <DestinationCard key={destination.id} destination={destination} />
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
        <div className="text-center py-16 col-span-full">
          <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground">{t('destinations_page_no_results_title')}</h3>
          <p className="text-muted-foreground mt-2">{t('destinations_page_no_results_message')}</p>
        </div>
      )}
    </div>
  );
}

export default function DestinationsPage() {
  // Wrap DestinationsContent with Suspense because useSearchParams() is used inside it.
  return (
    <Suspense fallback={<div className="container mx-auto py-12 px-4 text-center">Loading filters...</div>}>
      <DestinationsContent />
    </Suspense>
  );
}

    

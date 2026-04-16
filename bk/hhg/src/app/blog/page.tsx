
"use client";

import { useState, useMemo, useEffect } from 'react';
import { blogPostsData, type BlogPost } from '@/lib/mock-data';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/hooks/use-language';
import { MessageCircle } from 'lucide-react';

const POSTS_PER_PAGE = 20; // Changed from 10 to 20

export default function BlogPage() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const safeBlogPostsData = Array.isArray(blogPostsData) ? blogPostsData : [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const sortedPosts = useMemo(() => {
    return [...safeBlogPostsData].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (isNaN(dateA) && isNaN(dateB)) return 0;
        if (isNaN(dateA)) return 1;
        if (isNaN(dateB)) return -1;
        return dateB - dateA;
    });
  }, [safeBlogPostsData]);

  const paginatedPosts = useMemo(() => {
    if (sortedPosts.length === 0) return [];
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return sortedPosts.slice(startIndex, endIndex);
  }, [sortedPosts, currentPage]);

  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

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
        if (currentPage > halfPagesToShow + 2 && totalPages > maxPagesToShow) {
            pageNumbers.push(-1);
        }
        let startPage = Math.max(2, currentPage - halfPagesToShow);
        let endPage = Math.min(totalPages - 1, currentPage + halfPagesToShow);
        if (currentPage <= halfPagesToShow + 1 ) {
            endPage = Math.min(totalPages - 1, maxPagesToShow -1);
        }
        if (currentPage >= totalPages - halfPagesToShow ) {
             startPage = Math.max(2, totalPages - maxPagesToShow + 2);
        }
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        if (currentPage < totalPages - halfPagesToShow - 1 && endPage < totalPages -1) {
            pageNumbers.push(-1);
        }
        if (totalPages > 1) pageNumbers.push(totalPages);
    }
    return pageNumbers.filter((value, index, self) => {
        if (value === -1) {
            return index === 0 ? false : self[index -1] !== -1;
        }
        return self.indexOf(value) === index;
    }).filter((value, index, self) => !(value === -1 && self[index+1] === totalPages && totalPages - (self[index-1]||0) <= 2 ) );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-full xl:max-w-screen-xl">
        <header className="text-center mb-12">
          <Skeleton className="h-10 w-1/2 mx-auto rounded-md" />
          <Skeleton className="h-4 w-3/4 mx-auto mt-4 rounded-md" />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"> {/* Adjusted for 2 columns and max-width */}
          {Array.from({ length: 6 }).map((_, i) => ( // Show a few rows of skeletons
            <Card key={`sk-main-${i}`} className="shadow-lg rounded-lg">
              <Skeleton className="h-64 w-full rounded-t-lg" />
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
                <Skeleton className="h-16 w-full rounded-md" />
                <Skeleton className="h-10 w-1/3 rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-full xl:max-w-screen-xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {t('blog_page_title')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('blog_page_subtitle')}
        </p>
      </header>

      {paginatedPosts.length > 0 ? (
        <>
          {/* Grid for 2 columns on medium screens and up */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {paginatedPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
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
        <div className="text-center py-16">
          <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground">{t('blog_no_posts_title')}</h3>
          <p className="text-muted-foreground mt-2">{t('blog_no_posts_message')}</p>
        </div>
      )}
    </div>
  );
}

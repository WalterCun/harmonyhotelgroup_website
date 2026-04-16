
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

interface DestinationFiltersProps {
  onSearchChange: (searchTerm: string) => void;
  initialSearchTerm?: string;
}

export function DestinationFilters({ onSearchChange, initialSearchTerm = "" }: DestinationFiltersProps) {
  const { t } = useLanguage();
  const [currentSearch, setCurrentSearch] = useState(initialSearchTerm);

  // Update currentSearch when initialSearchTerm prop changes (e.g., from URL query param)
  useEffect(() => {
    if (initialSearchTerm !== currentSearch) {
      setCurrentSearch(initialSearchTerm);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(currentSearch);
    }, 300); // Debounce search input

    return () => {
      clearTimeout(handler);
    };
  }, [currentSearch, onSearchChange]);

  const clearSearch = () => {
    setCurrentSearch("");
    // onSearchChange(""); // This will be called by the debounced useEffect
  };

  return (
    <Card className="mb-8 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-primary">{t('destinations_page_filters_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-x-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('destinations_page_search_placeholder')}
              value={currentSearch}
              onChange={(e) => setCurrentSearch(e.target.value)}
              className="pl-10"
            />
             {currentSearch && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={clearSearch}
                aria-label={t('btn_clear_search')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

    
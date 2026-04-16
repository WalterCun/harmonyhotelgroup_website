
"use client"

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allAmenities } from '@/lib/mock-data';
import { useLanguage } from '@/hooks/use-language';
import { useCurrency } from '@/hooks/use-currency';
import type { Currency } from '@/lib/constants';
import { SlidersHorizontal, Filter } from 'lucide-react'; // Added icons

export interface HotelFiltersType {
  location: string;
  priceRange: [number, number];
  amenities: string[];
}

interface HotelFiltersProps {
  onFilterChange: (filters: HotelFiltersType) => void;
  initialFilters: HotelFiltersType;
  maxPrice: number;
  availableLocations: string[];
}

const ALL_LOCATIONS_SENTINEL_VALUE = "_all_locations_";

export const HotelFilters: FC<HotelFiltersProps> = ({ onFilterChange, initialFilters, maxPrice, availableLocations }) => {
  const { t } = useLanguage();
  const { currency, formatPrice } = useCurrency();

  const [location, setLocation] = useState(initialFilters.location);
  const [priceRange, setPriceRange] = useState<[number, number]>(
    [
      Math.min(initialFilters.priceRange[0], maxPrice),
      Math.min(initialFilters.priceRange[1], maxPrice)
    ]
  );
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialFilters.amenities);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false); // State for toggling advanced filters

  useEffect(() => {
    setLocation(initialFilters.location);
    setPriceRange([
        Math.min(initialFilters.priceRange[0], maxPrice),
        Math.min(initialFilters.priceRange[1], maxPrice)
    ]);
    setSelectedAmenities(initialFilters.amenities);
  }, [initialFilters, maxPrice]);

  useEffect(() => {
    setPriceRange(currentRange => {
      const newMax = maxPrice;
      const newHigh = Math.min(currentRange[1], newMax);
      const newLow = Math.min(currentRange[0], newHigh);
      if (isNaN(newLow) || isNaN(newHigh)) {
        return [0, newMax > 0 ? newMax : 1000];
      }
      return [newLow, newHigh];
    });
  }, [maxPrice]);


  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = () => {
    onFilterChange({
      location,
      priceRange,
      amenities: selectedAmenities,
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-primary">{t('hotels_filters_title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="location-select" className="text-foreground/80">{t('filter_location')}</Label>
          <Select
            value={location === '' ? ALL_LOCATIONS_SENTINEL_VALUE : location}
            onValueChange={(value) => {
              setLocation(value === ALL_LOCATIONS_SENTINEL_VALUE ? '' : value);
            }}
          >
            <SelectTrigger id="location-select" className="mt-1">
              <SelectValue placeholder={t('filter_location_placeholder_select')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_LOCATIONS_SENTINEL_VALUE}>{t('filter_location_all')}</SelectItem>
              {availableLocations.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="w-full text-primary border-primary hover:bg-primary/5"
        >
          {showAdvancedFilters ? (
            <>
              <SlidersHorizontal className="mr-2 h-4 w-4" /> {t('btn_show_fewer_filters')}
            </>
          ) : (
            <>
              <Filter className="mr-2 h-4 w-4" /> {t('btn_show_more_filters')}
            </>
          )}
        </Button>

        {showAdvancedFilters && (
          <>
            <div>
              <Label htmlFor="priceRange" className="text-foreground/80">{t('filter_price_range')}</Label>
              <Slider
                id="priceRange"
                min={0}
                max={maxPrice > 0 ? maxPrice : 1000}
                step={maxPrice > 0 ? Math.max(1, Math.round(maxPrice / 100)) : 10}
                value={priceRange}
                onValueChange={(newRange) => setPriceRange(newRange as [number,number])}
                className="mt-2 [&>span>span]:bg-primary"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-1">
                <span>{formatPrice(priceRange[0], currency as Currency)}</span>
                <span>{formatPrice(priceRange[1], currency as Currency)}</span>
              </div>
            </div>

            <div>
              <Label className="text-foreground/80">{t('filter_amenities')}</Label>
              <div className="mt-2 overflow-x-auto py-2">
                <div className="inline-grid grid-flow-col auto-cols-max grid-rows-2 gap-x-4 gap-y-2">
                  {allAmenities.map(amenity => (
                    <div key={amenity} className="flex items-center space-x-2 flex-shrink-0">
                      <Checkbox
                        id={`amenity-${amenity}`}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityChange(amenity)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal text-foreground/90 cursor-pointer whitespace-nowrap">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
          {t('btn_apply_filters')}
        </Button>
      </CardContent>
    </Card>
  );
};

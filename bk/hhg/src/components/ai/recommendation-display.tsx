
"use client"

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import type { Hotel } from '@/lib/mock-data'; // Assuming recommendations might be parsable to this
import { HotelCard } from '@/components/hotels/hotel-card'; // Re-use for display consistency

interface RecommendationDisplayProps {
  recommendations: string | null; // JSON string
  isLoading: boolean;
  error: string | null;
}

// Simple type guard for Hotel array
function isHotelArray(data: any): data is Hotel[] {
  return Array.isArray(data) && data.every(item => 
    typeof item === 'object' && item !== null && 'id' in item && 'name' in item && 'location' in item
  );
}


export const RecommendationDisplay: FC<RecommendationDisplayProps> = ({ recommendations, isLoading, error }) => {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="mt-8 text-center">
        <p className="text-lg text-primary animate-pulse">{t('ai_results_loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="mt-8 border-destructive shadow-lg">
        <CardHeader>
          <CardTitle className="text-destructive">{t('ai_results_error')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations) {
    return null; // No recommendations yet, or form not submitted
  }
  
  let parsedRecommendations: any = null;
  let parseError = false;
  try {
    parsedRecommendations = JSON.parse(recommendations);
  } catch (e) {
    parseError = true;
  }


  return (
    <Card className="mt-10 shadow-xl w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{t('ai_results_title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {parseError ? (
           <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
            {recommendations}
          </pre>
        ) : isHotelArray(parsedRecommendations) ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(parsedRecommendations as Hotel[]).map((hotel, index) => (
              // Assuming the AI returns data compatible with HotelCard. If not, adjust.
              // This is an optimistic parsing.
              <HotelCard key={hotel.id || index} hotel={hotel} />
            ))}
          </div>
        ) : (
          // Fallback for non-array JSON or if structure doesn't match HotelCard
          <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(parsedRecommendations, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
};

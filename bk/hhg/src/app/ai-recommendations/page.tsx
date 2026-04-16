
"use client"

import { useState } from 'react';
import { RecommendationForm } from '@/components/ai/recommendation-form';
import { RecommendationDisplay } from '@/components/ai/recommendation-display';
import { getHotelRecommendations, type HotelRecommendationsInput, type HotelRecommendationsOutput } from '@/ai/flows/hotel-recommendations';
import { useLanguage } from '@/hooks/use-language';

export default function AiRecommendationsPage() {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleSubmit = async (data: HotelRecommendationsInput) => {
    setIsLoading(true);
    setError(null);
    setRecommendations(null);

    try {
      const result: HotelRecommendationsOutput = await getHotelRecommendations(data);
      if (result && result.hotelRecommendations) {
        setRecommendations(result.hotelRecommendations);
      } else {
        setError(t('ai_results_no_results'));
      }
    } catch (err) {
      console.error("AI Recommendation Error:", err);
      setError(t('ai_results_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <RecommendationForm onSubmit={handleSubmit} isLoading={isLoading} />
      {(recommendations || isLoading || error) && (
        <RecommendationDisplay
          recommendations={recommendations}
          isLoading={isLoading}
          error={error}
        />
      )}
    </div>
  );
}

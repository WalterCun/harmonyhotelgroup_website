
"use client"

import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react'; // Using Lucide Star for ratings

// Placeholder icons - consider real SVGs or a library if specific branding is needed
const GoogleIcon = () => <span className="font-bold text-blue-600">G</span>;
const BookingIcon = () => <span className="font-bold text-blue-700">B.</span>;
const TripAdvisorIcon = () => <span className="font-bold text-green-500">T</span>;


interface Review {
  id: string;
  source: 'Google' | 'Booking' | 'TripAdvisor';
  reviewerName: string;
  reviewerAvatar?: string; // Optional: URL to avatar image
  rating: number; // 0-5
  reviewTextKey: string;
  reviewText: string;
  dataAiHintAvatar: string;
}

const latestReviewsData: Review[] = [
  {
    id: 'review1',
    source: 'Google',
    reviewerName: 'Alice Wonderland',
    reviewerAvatar: 'https://placehold.co/40x40.png',
    rating: 5,
    reviewTextKey: 'review_text_1',
    reviewText: 'Absolutely loved my stay! The staff were incredibly friendly and the views were breathtaking. Will definitely come back!',
    dataAiHintAvatar: 'woman smiling'
  },
  {
    id: 'review2',
    source: 'Booking',
    reviewerName: 'John Doe',
    reviewerAvatar: 'https://placehold.co/40x40.png',
    rating: 4,
    reviewTextKey: 'review_text_2',
    reviewText: 'Great location and comfortable rooms. Breakfast could have more variety, but overall a very pleasant experience.',
    dataAiHintAvatar: 'man portrait'
  },
  {
    id: 'review3',
    source: 'TripAdvisor',
    reviewerName: 'Maria Garcia',
    rating: 5,
    reviewTextKey: 'review_text_3',
    reviewText: 'Unforgettable experience! The hotel amenities were top-notch, and the concierge was very helpful in planning our activities.',
    dataAiHintAvatar: 'traveler happy'
  },
];

const sourceIcons = {
  Google: <GoogleIcon />,
  Booking: <BookingIcon />,
  TripAdvisor: <TripAdvisorIcon />,
};

export function LatestReviews() {
  const { t } = useLanguage();

  return (
    <section id="reviews" className="py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            {t('latest_reviews_title')}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('latest_reviews_subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {latestReviewsData.map((review) => (
            <Card key={review.id} className="shadow-lg flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    {review.reviewerAvatar && <AvatarImage src={review.reviewerAvatar} alt={review.reviewerName} data-ai-hint={review.dataAiHintAvatar} />}
                    <AvatarFallback>{review.reviewerName.substring(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base font-semibold text-foreground">{review.reviewerName}</CardTitle>
                     <p className="text-xs text-muted-foreground">{t('review_source_from')} {review.source}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground p-1 border rounded-md bg-muted/30">
                  {sourceIcons[review.source]}
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-2">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  "{t(review.reviewTextKey, review.reviewText)}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


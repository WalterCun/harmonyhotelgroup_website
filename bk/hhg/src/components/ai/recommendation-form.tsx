
"use client"

import type { FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLanguage } from '@/hooks/use-language';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { HotelRecommendationsInput } from '@/ai/flows/hotel-recommendations';

const formSchema = z.object({
  preferences: z.string().min(10, { message: "Preferences must be at least 10 characters." }),
  pastBookingHistory: z.string().refine(val => {
    if (val === '') return true; // Optional field essentially
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, { message: "Past booking history must be valid JSON or empty." }).optional(),
  realTimeAvailability: z.string().refine(val => {
     if (val === '') return true; // Optional field essentially
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }, { message: "Real-time availability must be valid JSON or empty." }).optional(),
});

type RecommendationFormValues = z.infer<typeof formSchema>;

interface RecommendationFormProps {
  onSubmit: (data: HotelRecommendationsInput) => void;
  isLoading: boolean;
}

export const RecommendationForm: FC<RecommendationFormProps> = ({ onSubmit, isLoading }) => {
  const { t } = useLanguage();
  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferences: '',
      pastBookingHistory: '',
      realTimeAvailability: '',
    },
  });

  const handleFormSubmit: SubmitHandler<RecommendationFormValues> = (data) => {
    // The AI flow expects all three string fields. Provide empty strings if not filled.
    const submissionData: HotelRecommendationsInput = {
        preferences: data.preferences,
        pastBookingHistory: data.pastBookingHistory || '[]', // Default to empty JSON array string
        realTimeAvailability: data.realTimeAvailability || '[]', // Default to empty JSON array string
    };
    onSubmit(submissionData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">{t('ai_recommendations_title')}</CardTitle>
        <CardDescription>{t('Fill in your details to get personalized hotel suggestions.')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">{t('ai_form_preferences_label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('ai_form_preferences_placeholder')}
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pastBookingHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">{t('ai_form_booking_history_label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('ai_form_booking_history_placeholder')}
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="realTimeAvailability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">{t('ai_form_availability_label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('ai_form_availability_placeholder')}
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? t('ai_results_loading') : t('ai_form_submit_button')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

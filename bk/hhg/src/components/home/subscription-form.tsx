
"use client"

import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';


export function SubscriptionForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: t('toast_error_title'),
        description: t('subscription_error_invalid_email'),
        variant: 'destructive',
      });
      return;
    }
    console.log('Subscribing email:', email);
    toast({
        title: t('subscription_success_title'),
        description: t('subscription_success_message', { email }),
    });
    setEmail(''); 
  };

  return (
    <section id="subscription" className="py-6 md:py-8 lg:py-10 bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <Card className="w-[90%] mx-auto shadow-xl border-primary/20">
          {/* Changed md:grid-cols-2 to md:grid-cols-[max-content_1fr] */}
          <div className="grid md:grid-cols-[max-content_1fr] gap-x-8 gap-y-6 items-center p-6 py-8 md:p-10 lg:p-12">
            {/* Left Column: Text content (will take width of its content) */}
            <div className="text-center md:text-left">
              <Mail className="mx-auto md:mx-0 h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl md:text-3xl font-semibold leading-none tracking-tight text-primary">
                {t('subscription_title')}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto md:mx-0">
                {t('subscription_subtitle')}
              </p>
            </div>
            {/* Right Column: Form (will take remaining space) */}
            <div className="w-full">
              {/* Removed max-w-md and mx-auto from form, added w-full */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:ml-0">
                <Input
                  type="email"
                  placeholder={t('subscription_email_placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow h-11 text-base" 
                  aria-label={t('subscription_email_label')}
                />
                <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 sm:w-auto w-full">
                  {t('subscription_button_text')}
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}


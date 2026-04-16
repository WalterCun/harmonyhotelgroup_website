
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { HotelMapPlaceholder } from "@/components/hotels/hotel-map-placeholder";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "contact_form_name_min_error" }),
  email: z.string().email({ message: "contact_form_email_invalid_error" }),
  subject: z.string().min(5, { message: "contact_form_subject_min_error" }),
  message: z.string().min(10, { message: "contact_form_message_min_error" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log("Contact form submitted:", data);
    toast({
      title: t("contact_form_success_title"),
      description: t("contact_form_success_desc", { name: data.name }),
    });
    form.reset();
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {t('page_title_contact')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('contact_page_subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch"> {/* Changed items-start to items-stretch */}
        {/* Columna del Formulario */}
        <Card className="shadow-xl flex flex-col h-full"> {/* Added flex flex-col h-full */}
          <CardHeader>
            <CardTitle className="text-2xl text-primary">{t('contact_form_title')}</CardTitle>
            <CardDescription>{t('contact_form_description')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-1"> {/* Added flex flex-col flex-1 */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 space-y-6"> {/* Added flex flex-col flex-1 */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact_form_name_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('contact_form_name_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact_form_email_label')}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={t('contact_form_email_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact_form_subject_label')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('contact_form_subject_placeholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1"> {/* Added flex flex-col flex-1 */}
                      <FormLabel>{t('contact_form_message_label')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('contact_form_message_placeholder')}
                          className="flex-1 resize-none min-h-[120px]" // Changed: removed rows, added flex-1, resize-none, min-h
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-auto" disabled={form.formState.isSubmitting}> {/* Added mt-auto to push button to bottom */}
                  <Send className="mr-2 h-4 w-4" />
                  {form.formState.isSubmitting ? t('contact_form_sending_button') : t('contact_form_send_button')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Columna de Información de Contacto y Mapa */}
        <div className="space-y-8">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{t('contact_info_title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground/90">{t('contact_info_address_title')}</h3>
                  <p className="text-muted-foreground">{t('contact_info_address_placeholder')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground/90">{t('contact_info_phone_title')}</h3>
                  <p className="text-muted-foreground">{t('contact_info_phone_placeholder')}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground/90">{t('contact_info_email_title')}</h3>
                  <p className="text-muted-foreground hover:text-primary transition-colors">
                    <a href={`mailto:${t('contact_info_email_placeholder')}`}>{t('contact_info_email_placeholder')}</a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">{t('contact_map_title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <HotelMapPlaceholder locationName={t('contact_map_location_name_placeholder')} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    
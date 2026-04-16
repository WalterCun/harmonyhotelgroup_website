
"use client"

import { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { es, fr } from 'date-fns/locale';
import type { DateRange, ActiveModifiers } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, Users, Smile, BedDouble, Utensils, Car, MapPin as MapPinIcon, Building, GroupIcon, Hotel, BusFront } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { mockHotels } from '@/lib/mock-data';

const bookingFormSchemaBase = z.object({
  city: z.string().min(1, "booking_form_city_required"),
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  })
  .refine(data => data.from !== undefined, {
    message: "booking_form_check_in_required",
    path: [],
  })
  .refine(data => data.to !== undefined, {
    message: "booking_form_check_out_required",
    path: [],
  })
  .refine(data => {
    if (data.from && data.to) {
      return data.to > data.from;
    }
    return true;
  },
  {
    message: "booking_form_checkout_after_checkin_error",
    path: [],
  }),
  adults: z.string().min(1, "booking_form_adults_selection_required"),
  rooms: z.string().min(1, "booking_form_rooms_required"),
  
  children: z.string().optional(),
  childrenAges: z.array(
    z.object({
      age: z.string({required_error: "child_age_required"})
        .pipe(
          z.coerce.number({ invalid_type_error: "child_age_must_be_number" })
            .min(0, {message: "child_age_min_error"})
            .max(17, {message: "child_age_max_error"})
        )
    })
  ).optional().default([]),

  groupAdults: z.coerce.number({invalid_type_error: "booking_form_group_adults_numeric"}).optional(),
  groupChildrenUnder5: z.coerce.number({invalid_type_error: "booking_form_group_children_numeric"}).min(0,"booking_form_group_children_non_negative").optional(),
  groupChildrenUnder12: z.coerce.number({invalid_type_error: "booking_form_group_children_numeric"}).min(0,"booking_form_group_children_non_negative").optional(),

  breakfast: z.boolean().default(false),
  parking: z.boolean().default(false),
  largeGroupVehicleType: z.string().optional(),
});

const bookingFormSchema = bookingFormSchemaBase.superRefine((data, ctx) => {
  const isGroupSelected = data.adults === "Group";

  if (isGroupSelected) {
    if (data.groupAdults === undefined || data.groupAdults < 1) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "booking_form_group_adults_required", path: ["groupAdults"] });
    }
    // For group bookings, "rooms" field will now hold string keys like "shared_room"
    // The .min(1, "booking_form_rooms_required") in the base schema handles that it's not empty.
  } else { 
    const adultsVal = data.adults ? parseInt(data.adults, 10) : 0;
    if (isNaN(adultsVal) || adultsVal < 1 || adultsVal > 8) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "booking_form_adults_invalid_count", path: ["adults"] });
    }
    // For non-group bookings, "rooms" field will be a number string like "1", "2", etc.
    // The .min(1, "booking_form_rooms_required") still applies.

    const numChildren = parseInt(data.children || "0", 10);
    if (numChildren > 0) {
      if (!data.childrenAges || data.childrenAges.length !== numChildren) {
        // Individual age field validation is primary.
      }
    }
  }
});


type BookingFormValues = z.infer<typeof bookingFormSchema>;

const uniqueCities = Array.from(new Set(mockHotels.map(hotel => hotel.location))).sort();

const standardAdultOptionsCount = 8;
const adultOptions = [
    ...Array.from({ length: standardAdultOptionsCount }, (_, i) => String(i + 1)),
    "Group"
];

const childrenOptions = Array.from({ length: 10 }, (_, i) => String(i));
const roomOptions = Array.from({ length: 10 }, (_, i) => String(i + 1));

const groupRoomTypeOptions = [
  { value: "shared_room", labelKey: "group_room_type_shared_room" },
  { value: "shared_beds", labelKey: "group_room_type_shared_beds" },
  { value: "independent_rooms", labelKey: "group_room_type_independent_rooms" },
];

const vehicleTypeOptions = [
  { value: "buseta", labelKey: "vehicle_type_buseta" },
  { value: "furgoneta", labelKey: "vehicle_type_furgoneta" },
  { value: "bus", labelKey: "vehicle_type_bus" },
  { value: "flota_vehiculos", labelKey: "vehicle_type_flota" },
  { value: "cooperativa_transporte", labelKey: "vehicle_type_cooperativa" },
  { value: "otro", labelKey: "vehicle_type_other" },
];

export function BookingForm() {
  const { t, language } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined' && !form.getValues("city")) {
      fetch('http://ip-api.com/json')
        .then(response => response.json())
        .then(data => {
          if (data.country) {
            const userCountry = data.country;
            const cityForCountry = uniqueCities.find(cityOption => {
              const [, countryPart] = cityOption.split(',').map(s => s.trim());
              return countryPart && countryPart.toLowerCase() === userCountry.toLowerCase();
            });
            if (cityForCountry) {
              form.setValue("city", cityForCountry, { shouldValidate: true });
              toast({
                title: t("toast_info_title"),
                description: t("toast_city_autoselected", { city: cityForCountry.split(',')[0] }),
              });
            }
          }
        })
        .catch(error => console.warn("Could not fetch geolocation:", error));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient]);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      city: "",
      dateRange: {
        from: undefined,
        to: undefined,
      },
      adults: "2",
      rooms: "1", // Default to "1" (string for numeric)
      children: "0",
      childrenAges: [],
      groupAdults: undefined, 
      groupChildrenUnder5: undefined,
      groupChildrenUnder12: undefined,
      breakfast: false,
      parking: true, // Default to true, will be set to false if large group
      largeGroupVehicleType: "buseta",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "childrenAges"
  });

  const numChildrenSelected = parseInt(form.watch("children") || "0", 10);
  const selectedAdultsOption = form.watch("adults");
  const isGroupBookingActive = selectedAdultsOption === "Group";

  const groupAdultsVal = parseInt(form.watch("groupAdults")?.toString() || "0", 10);
  const groupChildrenUnder5Val = parseInt(form.watch("groupChildrenUnder5")?.toString() || "0", 10); 
  const groupChildrenUnder12Val = parseInt(form.watch("groupChildrenUnder12")?.toString() || "0", 10);
  const currentVehicleTypeFromWatch = form.watch("largeGroupVehicleType");

  const totalPeopleForParkingRule = groupAdultsVal + groupChildrenUnder5Val + groupChildrenUnder12Val;
  const isLargeGroup = isGroupBookingActive && totalPeopleForParkingRule > 8;

  useEffect(() => {
    const currentRoomsValue = form.getValues("rooms");
    if (selectedAdultsOption === "Group") {
      if (!groupRoomTypeOptions.some(opt => opt.value === currentRoomsValue)) {
        form.setValue("rooms", "independent_rooms", { shouldValidate: true }); 
      }
      if(fields.length > 0) {
        for (let i = fields.length -1; i >=0; i--) { remove(i); }
        form.setValue("children", "0"); 
      }
    } else {
      if (groupRoomTypeOptions.some(opt => opt.value === currentRoomsValue) || isNaN(parseInt(currentRoomsValue))) {
        form.setValue("rooms", "1", { shouldValidate: true }); 
      }
    }
  }, [selectedAdultsOption, form, fields.length, remove]);


  useEffect(() => {
    const currentAgesCount = fields.length;
    if (!isGroupBookingActive) { 
        if (numChildrenSelected > currentAgesCount) {
            for (let i = currentAgesCount; i < numChildrenSelected; i++) {
            append({ age: "" });
            }
        } else if (numChildrenSelected < currentAgesCount) {
            const fieldsToRemove = currentAgesCount - numChildrenSelected;
            for (let i = 0; i < fieldsToRemove; i++) {
            remove(currentAgesCount - 1 - i);
            }
        }
    }
  }, [numChildrenSelected, fields.length, append, remove, isGroupBookingActive]);
  
  useEffect(() => {
    if (isLargeGroup) {
      form.setValue("parking", false, { shouldValidate: true });
      
      const totalPeopleForVehicleCapacity = groupAdultsVal + groupChildrenUnder12Val;
      const currentVehicleType = currentVehicleTypeFromWatch || "buseta";
      
      let newVehicleType = currentVehicleType;

      if (currentVehicleType === "buseta" && totalPeopleForVehicleCapacity > 12) {
        newVehicleType = "furgoneta";
      }
      if (newVehicleType === "furgoneta" && totalPeopleForVehicleCapacity > 24) {
        newVehicleType = "bus";
      }
      
      if (newVehicleType !== currentVehicleTypeFromWatch) {
        form.setValue("largeGroupVehicleType", newVehicleType, { shouldValidate: true });
      }

    } else if (isGroupBookingActive) { // Small group
        form.setValue("parking", true, {shouldValidate: true}); // Re-enable parking if it's a small group
    }
  }, [isLargeGroup, form, groupAdultsVal, groupChildrenUnder12Val, currentVehicleTypeFromWatch, isGroupBookingActive]);


  const getDateLocale = () => {
    if (language === 'es') return es;
    if (language === 'fr') return fr;
    return undefined;
  };

  const handleFormSubmit = (data: BookingFormValues) => {
    const { city, dateRange, adults, rooms, children, childrenAges, groupAdults, groupChildrenUnder5, groupChildrenUnder12, breakfast, parking, largeGroupVehicleType } = data;
    
    const fromDate = dateRange.from ? format(dateRange.from, "PPP", { locale: getDateLocale() }) : 'N/A';
    const toDate = dateRange.to ? format(dateRange.to, "PPP", { locale: getDateLocale() }) : 'N/A';

    let message = `${t('whatsapp_booking_header')}\n\n`;
    message += `${t('booking_form_city_select_label')}: ${city}\n`;
    message += `${t('booking_form_check_in')}: ${fromDate}\n`;
    message += `${t('booking_form_check_out')}: ${toDate}\n`;
    

    if (adults === "Group") {
        const groupRoomTypeOption = groupRoomTypeOptions.find(opt => opt.value === rooms);
        const roomTypeText = groupRoomTypeOption ? t(groupRoomTypeOption.labelKey) : rooms;
        message += `${t('booking_form_rooms')}: ${roomTypeText}\n`;
        message += `${t('booking_form_adults_group_label')}: ${groupAdults}\n`;
        if (groupChildrenUnder5 !== undefined && groupChildrenUnder5 > 0) {
            message += `${t('booking_form_group_children_under_5_label')}: ${groupChildrenUnder5}\n`;
        }
        if (groupChildrenUnder12 !== undefined && groupChildrenUnder12 > 0) {
            message += `${t('booking_form_group_children_under_12_label')}: ${groupChildrenUnder12}\n`;
        }
        if (isLargeGroup && largeGroupVehicleType) {
            const vehicleTypeOption = vehicleTypeOptions.find(opt => opt.value === largeGroupVehicleType);
            const vehicleTypeText = vehicleTypeOption ? t(vehicleTypeOption.labelKey) : largeGroupVehicleType;
            message += `${t('booking_form_large_group_vehicle_type_message_label')}: ${vehicleTypeText}\n`;
        }
    } else {
        message += `${t('booking_form_rooms')}: ${rooms} ${t(parseInt(rooms) !== 1 ? 'booking_form_rooms_plural_suffix' : 'booking_form_rooms_singular_suffix')}\n`;
        message += `${t('booking_form_adults')}: ${adults}\n`;
        if (parseInt(children || "0", 10) > 0) {
            message += `${t('booking_form_children')}: ${children}\n`;
            if (childrenAges && childrenAges.length > 0) {
                const ages = childrenAges.map(child => child.age).join(', ');
                message += `${t('Ages of Children')}: ${ages}\n`;
            }
        }
    }

    message += `${t('booking_form_breakfast')}: ${breakfast ? t('Yes') : t('No')}\n`;
    if (!isLargeGroup) { // Only show parking if not a large group (where vehicle type is shown instead)
        message += `${t('booking_form_parking')}: ${parking ? t('Yes') : t('No')}\n\n`;
    } else {
        message += '\n'; 
    }
    message += t('Please confirm availability.');

    const encodedMessage = encodeURIComponent(message);
    const whatsappPhoneNumber = "593996146471"; 
    
    const whatsappUrl = `https://wa.me/${whatsappPhoneNumber}?text=${encodedMessage}`;

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, '_blank');
      toast({
        title: t("Booking request prepared"),
        description: t("Please send the message via WhatsApp to finalize your request."),
      });
    } else {
       toast({
        title: t("toast_error_title"),
        description: "Could not open WhatsApp.",
        variant: "destructive",
      });
    }
  };


  if (!isClient) {
    return (
        <Card className="bg-background/90 backdrop-blur-sm shadow-2xl p-1 sm:p-2 md:p-1">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold text-primary">
                    {t('booking_form_title_home')}
                </CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                    {t('booking_form_subtitle_home')}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-2 md:p-1.5">
                <div className="h-72 w-full animate-pulse bg-muted rounded-md"></div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="bg-background/90 backdrop-blur-sm shadow-2xl p-2 sm:p-3 md:p-2">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-center text-2xl font-bold text-primary">
          {t('booking_form_title_home')}
        </CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground">
          {t('booking_form_subtitle_home')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-1.5 md:p-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-3">
            <div className="w-full">
               <FormField
                  control={form.control}
                  name="city"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="flex items-center text-sm font-medium text-foreground/80 mb-0.5">
                        <MapPinIcon className="mr-1.5 h-3.5 w-3.5 text-primary" />
                        {t('booking_form_city_select_label')}
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                        <FormControl>
                          <SelectTrigger className={cn("h-10 text-sm", fieldState.error && "border-destructive")}>
                            <SelectValue placeholder={t('booking_form_city_select_placeholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {uniqueCities.map(cityOption => (
                            <SelectItem key={cityOption} value={cityOption} className="text-sm">{cityOption}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs mt-0.5" />
                    </FormItem>
                  )}
                />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-2.5 gap-y-3">
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col lg:col-span-2">
                    <FormLabel className="flex items-center text-sm font-medium text-foreground/80 mb-0.5">
                      <CalendarDays className="mr-1.5 h-3.5 w-3.5 text-primary" />
                      {t('booking_form_date_range')}
                    </FormLabel>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            id="dateRange"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal h-10 text-sm",
                              !field.value?.from && "text-muted-foreground",
                              fieldState.error && "border-destructive"
                            )}
                            onClick={() => setCalendarOpen(true)}
                          >
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "PP", { locale: getDateLocale() })} -{" "}
                                  {format(field.value.to, "PP", { locale: getDateLocale() })}
                                </>
                              ) : (
                                format(field.value.from, "PP", { locale: getDateLocale() })
                              )
                            ) : (
                              <span>{t('booking_form_date_range_placeholder')}</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={field.value?.from}
                          selected={field.value as DateRange | undefined}
                           onSelect={(
                            newlySelectedRangeByRDP: DateRange | undefined,
                            selectedDay: Date,
                            activeModifiers: ActiveModifiers,
                            e: React.MouseEvent
                          ) => {
                            let rangeToSetInForm: DateRange | undefined = newlySelectedRangeByRDP;
                            const currentFormFieldValue = form.getValues("dateRange");

                            if (currentFormFieldValue?.from && currentFormFieldValue?.to && selectedDay) {
                                // A full range was selected, and user clicked another day: start a new range
                                rangeToSetInForm = { from: selectedDay, to: undefined };
                            } else if (newlySelectedRangeByRDP?.from && !newlySelectedRangeByRDP.to) {
                                // Only "from" is selected (either first click or re-click on from)
                                rangeToSetInForm = { from: newlySelectedRangeByRDP.from, to: undefined };
                            } else if (!newlySelectedRangeByRDP?.from) { 
                                // Cleared selection
                                rangeToSetInForm = {from: undefined, to: undefined};
                            }
                           
                            field.onChange(rangeToSetInForm);
                          
                            if (rangeToSetInForm?.from && rangeToSetInForm?.to) {
                              setCalendarOpen(false);
                            }
                          }}
                          numberOfMonths={2}
                          locale={getDateLocale()}
                          disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() -1))}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-xs mt-0.5" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="adults"
                render={({ field, fieldState }) => (
                  <FormItem className="lg:col-span-1">
                    <FormLabel className="flex items-center text-sm font-medium text-foreground/80 mb-0.5">
                      <Users className="mr-1.5 h-3.5 w-3.5 text-primary" />
                      {t('booking_form_adults')}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue="2">
                      <FormControl>
                        <SelectTrigger className={cn("h-10 text-sm", fieldState.error && "border-destructive")}>
                          <SelectValue placeholder={t('booking_form_adults_placeholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {adultOptions.map(option => (
                          <SelectItem key={`adult-${option}`} value={option} className="text-sm">
                            {option === "Group" ? t('booking_form_adults_group') : `${option} ${t(parseInt(option) > 1 ? 'booking_form_adults_plural_suffix' : 'booking_form_adults_singular_suffix')}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs mt-0.5" />
                  </FormItem>
                )}
              />
              
              {!isGroupBookingActive && (
                <>
                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field, fieldState }) => (
                      <FormItem className="lg:col-span-1">
                        <FormLabel className="flex items-center text-sm font-medium text-foreground/80 mb-0.5">
                          <Smile className="mr-1.5 h-3.5 w-3.5 text-primary" />
                          {t('booking_form_children')}
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue="0">
                          <FormControl>
                            <SelectTrigger className={cn("h-10 text-sm", fieldState.error && "border-destructive")}>
                              <SelectValue placeholder={t('booking_form_children_placeholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {childrenOptions.map(option => (
                              <SelectItem key={`child-count-${option}`} value={option} className="text-sm">{option} {t(parseInt(option) !== 1 ? 'booking_form_children_plural_suffix' : 'booking_form_children_singular_suffix')}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs mt-0.5" />
                      </FormItem>
                    )}
                  />
                
                  <FormField
                    control={form.control}
                    name="rooms"
                    render={({ field, fieldState }) => (
                      <FormItem className="lg:col-span-1">
                        <FormLabel className="flex items-center text-sm font-medium text-foreground/80 mb-0.5">
                          <BedDouble className="mr-1.5 h-3.5 w-3.5 text-primary" />
                          {t('booking_form_rooms')}
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} defaultValue="1">
                          <FormControl>
                            <SelectTrigger className={cn("h-10 text-sm", fieldState.error && "border-destructive")}>
                              <SelectValue placeholder={t('booking_form_rooms_placeholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roomOptions.map(option => (
                              <SelectItem key={`room-count-${option}`} value={option} className="text-sm">{option} {t(parseInt(option) !== 1 ? 'booking_form_rooms_plural_suffix' : 'booking_form_rooms_singular_suffix')}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs mt-0.5" />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            {isGroupBookingActive && (
                <div className="space-y-2 pt-1.5 border-t border-border mt-2.5">
                    <p className="text-sm font-medium text-primary flex items-center"><GroupIcon className="mr-1.5 h-4 w-4" />{t('booking_form_group_details_title')}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2.5 gap-y-2.5">
                        <FormField
                            control={form.control}
                            name="groupAdults"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name} className="text-sm font-medium text-foreground/80">{t('booking_form_group_adults_label')}</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 10" {...field} onChange={e => field.onChange(parseInt(e.target.value,10) || undefined)} min="1" className={cn("h-9 text-sm", fieldState.error && "border-destructive")} />
                                    </FormControl>
                                    <FormMessage className="text-xs mt-0.5" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="groupChildrenUnder5"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name} className="text-sm font-medium text-foreground/80">{t('booking_form_group_children_under_5_label')}</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 2" {...field} onChange={e => field.onChange(parseInt(e.target.value,10) || undefined)} min="0" className={cn("h-9 text-sm", fieldState.error && "border-destructive")} />
                                    </FormControl>
                                    <FormMessage className="text-xs mt-0.5" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="groupChildrenUnder12"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel htmlFor={field.name} className="text-sm font-medium text-foreground/80">{t('booking_form_group_children_under_12_label')}</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="e.g. 3" {...field} onChange={e => field.onChange(parseInt(e.target.value,10) || undefined)} min="0" className={cn("h-9 text-sm", fieldState.error && "border-destructive")} />
                                    </FormControl>
                                    <FormMessage className="text-xs mt-0.5" />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="rooms" // This is the rooms selector for Group mode
                            render={({ field, fieldState }) => (
                              <FormItem>
                                <FormLabel className="flex items-center text-sm font-medium text-foreground/80">
                                  <BedDouble className="mr-1.5 h-3.5 w-3.5 text-primary" />
                                  {t('booking_form_rooms')}
                                </FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue="independent_rooms">
                                  <FormControl>
                                    <SelectTrigger className={cn("h-9 text-sm", fieldState.error && "border-destructive")}>
                                      <SelectValue placeholder={t('booking_form_rooms_placeholder')} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {groupRoomTypeOptions.map(option => (
                                      <SelectItem key={`room-type-group-${option.value}`} value={option.value} className="text-sm">{t(option.labelKey)}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage className="text-xs mt-0.5" />
                              </FormItem>
                            )}
                          />
                    </div>
                </div>
            )}

            {!isGroupBookingActive && numChildrenSelected > 0 && (
              <div className="space-y-1 pt-0.5">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-2 gap-y-2">
                  {fields.map((item, index) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name={`childrenAges.${index}.age`}
                      render={({ field: ageField, fieldState: ageFieldState }) => (
                        <FormItem>
                          <FormLabel htmlFor={ageField.name} className="text-sm text-muted-foreground mb-0.5">
                            {t('booking_form_child_age_label', { index: index + 1 })}
                          </FormLabel>
                          <FormControl>
                            <Input
                              id={ageField.name}
                              type="number"
                              placeholder={t('booking_form_child_age_placeholder')}
                              {...ageField}
                              min="0"
                              max="17"
                              className={cn("h-9 text-sm", ageFieldState.error && "border-destructive")}
                            />
                          </FormControl>
                          <FormMessage className="text-xs mt-0.5" />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1">
              <FormField
                control={form.control}
                name="breakfast"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-1.5 space-y-0">
                     <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} id="breakfast"/>
                     </FormControl>
                    <Label htmlFor="breakfast" className="text-sm font-normal text-foreground/80 flex items-center cursor-pointer">
                       <Utensils className="mr-1 h-3.5 w-3.5 text-primary/80" />{t('booking_form_breakfast')}
                    </Label>
                  </FormItem>
                )}
              />
              {!isLargeGroup && (
                <FormField
                  control={form.control}
                  name="parking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-1.5 space-y-0">
                      <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} id="parking"/>
                      </FormControl>
                      <Label htmlFor="parking" className="text-sm font-normal text-foreground/80 flex items-center cursor-pointer">
                        <Car className="mr-1 h-3.5 w-3.5 text-primary/80" />{t('booking_form_parking')}
                      </Label>
                    </FormItem>
                  )}
                />
              )}
              {isLargeGroup && (
                 <FormField
                  control={form.control}
                  name="largeGroupVehicleType"
                  render={({ field, fieldState }) => {
                    const totalPeopleForVehicleCapacity = (groupAdultsVal || 0) + (groupChildrenUnder12Val || 0);
                    return (
                      <FormItem className="flex-grow">
                        <div className="flex items-center gap-x-2">
                          <div className="w-auto">
                            <Select 
                              onValueChange={field.onChange} 
                              value={field.value || "buseta"} 
                              defaultValue="buseta"
                            >
                              <FormControl>
                                <SelectTrigger className={cn("h-10 text-sm w-full", fieldState.error && "border-destructive")}>
                                  <SelectValue placeholder={t('booking_form_large_group_vehicle_type_placeholder')} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {vehicleTypeOptions.map(option => (
                                  <SelectItem 
                                    key={option.value} 
                                    value={option.value} 
                                    className="text-sm"
                                    disabled={
                                      (option.value === "buseta" && totalPeopleForVehicleCapacity > 12) ||
                                      (option.value === "furgoneta" && totalPeopleForVehicleCapacity > 24)
                                    }
                                  >
                                    {t(option.labelKey)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Label htmlFor={field.name} className="flex items-center text-sm font-medium text-foreground/80 whitespace-nowrap shrink-0">
                            <BusFront className="mr-1.5 h-3.5 w-3.5 text-primary shrink-0" />
                            {t('booking_form_large_group_vehicle_type_label')}
                          </Label>
                        </div>
                        <FormMessage className="text-xs mt-0.5" />
                      </FormItem>
                    );
                  }}
                />
              )}
            </div>

            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base mt-2 py-2.5">
              <BedDouble className="mr-1.5 h-4 w-4" /> {t('booking_form_book_now')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}


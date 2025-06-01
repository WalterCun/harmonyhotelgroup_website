import {defineAction} from "astro:actions";
import {z} from "astro:schema"

export const server = {
    validationForm: defineAction({
        accept: "form",
        input: z.object({
            city: z.string().min(2),
            dateRange: z.string().optional(),
            checkin: z.string().optional(),
            checkout: z.string().optional(),
            adults: z.string().min(1),
            rooms: z.string().min(1),

            children: z.string().optional(),
            groupAdults: z.string().optional(),
            groupChildrenUnder5: z.string().optional(),
            groupChildrenUnder12: z.string().optional(),
            groupRooms: z.string().optional(),
            largeGroupVehicleType: z.string().optional(),
        }).refine((data) => {

            if (data.adults === "Group") {
                return !!data.groupAdults;
            }

            return true;
        }),
        handler: async ({
                            city,
                            adults,
                            rooms,
                            children,
                            groupAdults,
                            groupChildrenUnder5,
                            groupChildrenUnder12,
                            groupRooms,
                            largeGroupVehicleType,
                            dateRange,
                            checkin,
                            checkout
                        }) => {
            return {
                success: true,
                form: {
                    city,
                    adults,
                    rooms,
                    children,
                    groupAdults,
                    groupChildrenUnder5,
                    groupChildrenUnder12,
                    groupRooms,
                    largeGroupVehicleType,
                    dateRange,
                    checkin,
                    checkout
                },
                message: 'Reserva procesada correctamente'
            }

        }
    })
}

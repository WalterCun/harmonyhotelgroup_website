import {defineAction} from "astro:actions";
import {z} from "astro:schema"

export const server = {
    validationForm: defineAction({
        accept: "form",
        input: z.object({
            city: z.string().min(2, "form.city.error"),
            adults: z.string().min(1, "Por favor selecciona el número de adultos"),
            children: z.string().optional(),
            rooms: z.string().min(1, "Por favor selecciona el número de habitaciones"),

        }),
        handler: async ({city, adults, rooms, children}) => {
            console.log("Action recibido:", {city, adults, rooms});

            return {
                success: true,
                message: 'Reserva procesada correctamente'
            }

        }
    })
}

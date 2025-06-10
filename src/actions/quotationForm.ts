import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const quotationForm = defineAction({
  accept: "form",
  input: z
    .object({
      city: z.string().min(2),
      dateRange: z.string().optional(),
      checkin: z.string().optional(),
      checkout: z.string().optional(),
      adults: z.string().min(1),
      // Hacemos que rooms sea opcional
      rooms: z.string().optional(),
      parking: z.string().optional(),
      breakfast: z.string().optional(),

      children: z.string().optional(),
      groupAdults: z.string().optional(),
      groupChildrenUnder5: z.string().optional(),
      groupChildrenUnder12: z.string().optional(),
      groupRooms: z.string().optional(),
      largeGroupVehicleType: z.string().optional(),
    })
    .refine(
      (data) => {
        // Si es grupo, requerimos groupAdults
        if (data.adults === "Group") {
          return !!data.groupAdults;
        }
        // Si NO es grupo, requerimos rooms
        return !!data.rooms;
      },
      {
        message:
          "Se requiere el número de habitaciones o el número de adultos para grupo",
        path: ["rooms", "groupAdults"],
      },
    ),

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
    checkout,
    parking,
    breakfast,
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
        checkout,
        parking,
        breakfast,
      },
      message: "Reserva procesada correctamente",
    };
  },
});

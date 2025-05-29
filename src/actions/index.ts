import {defineAction} from "astro:actions";
import {z} from "astro:schema"

export const server = {
    reservation: defineAction({
        accept: "form",
        input: z.object({
            city: z.string().min(2, "City must be at least 2 characters")
        }),
        handler: async ({city}) => {
            console.log("Action", city)
        }
    })
}

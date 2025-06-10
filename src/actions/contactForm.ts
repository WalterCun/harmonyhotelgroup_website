import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import formData from "form-data";
import Mailgun from "mailgun.js";
import { contactTemplate } from "~/templates/contactTemplate";

export const contactForm = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    message: z.string().min(10),
  }),
  handler: async ({ email, message }) => {
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "api",
      key: import.meta.env.MAILGUN_API_KEY || "API KEY",
    });

    try {
      const msg = await mg.messages.create(import.meta.env.MAILGUN_URL, {
        from: "Notificador HHG <notificaciones@harmonyhotelgroup.com>",
        to: ["waltercunbustamante@gmail.com"],
        subject: "Nuevo mensaje de contacto",
        text: "Nuevo mensaje de contacto",
        html: contactTemplate({ email, message }),
      });
      return { status: true, message: "Email sent" };
    } catch (err) {
      return { status: false, message: "Error sending email" };
    }
  },
});

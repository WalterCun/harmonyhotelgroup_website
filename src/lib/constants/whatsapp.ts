// WhatsApp related constants
import { DateUtils } from "~/utils/calculator.ts";

export const whatsappNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER;

interface FormData {
  city: string;
  checkin?: string;
  checkout?: string;
  adults: string;
  rooms: string;
  children?: string;
  groupAdults?: string;
  groupChildrenUnder5?: string;
  groupChildrenUnder12?: string;
  groupRooms?: string;
  largeGroupVehicleType?: string;
  breakfast?: boolean;
  parking?: boolean;
}

/**
 * Formatea el mensaje para WhatsApp basado en los datos del formulario
 * @param formData - Datos del formulario
 * @returns mensaje formateado
 */
export function formatWhatsAppMessage(formData: FormData): string {
  const checkin = `${formData.checkin}` || "Fechas no especificadas";
  const chekout = `${formData.checkout}` || "Fechas no especificadas";

  let message = `Hola! Me interesa hacer una reserva en ${formData.city}\n\n`;
  message += `Fechas Ingreso: ${checkin}\n`;
  message += `Fechas Salida: ${chekout}\n`;
  message += `N° Noches: ${DateUtils.differenceDays(checkin, chekout)}\n\n`;

  if (formData.adults === "Group") {
    message += "** Grupo **\n";
    message += `Adultos: ${formData.groupAdults} \n`;
    if (formData.groupChildrenUnder5)
      message += `Niños menores de 5 años: ${formData.groupChildrenUnder5}\n`;
    if (formData.groupChildrenUnder12)
      message += `Niños menores de 12 años: ${formData.groupChildrenUnder12}\n`;
    message += `${formData.groupRooms}\n`;
    message += formData.breakfast ? "Desayuno incluido\n" : "Sin desayuno\n";
    if (formData.largeGroupVehicleType)
      message += `Tipo de vehículo: ${formData.largeGroupVehicleType}\n`;
  } else {
    message += `${formData.adults} adultos\n`;
    if (formData.children) message += `${formData.children} niños\n`;
    message += `${formData.rooms} habitaciones\n\n`;
    message += formData.breakfast ? "Desayuno incluido\n" : "Sin desayuno\n";
    if (formData.parking) message += "Reserva para vehiculo\n";
  }

  return message;
}

/**
 * Abre WhatsApp en una nueva pestaña con un mensaje predefinido
 * @param phoneNumber - Número de teléfono incluyendo código de país (sin + o 00)
 * @param message - Mensaje predefinido que se enviará
 */
export function createWhatsAppLink({
  phoneNumber,
  message,
}: { phoneNumber: string; message: string }): void {
  // Formato del número: debe incluir código de país sin + o 00 (ej: 5491112345678)
  // Codificar el mensaje para URL
  console.log("phoneNumber", phoneNumber);
  const encodedMessage = encodeURIComponent(message);

  // Crear la URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Abrir en una nueva pestaña
  window.open(whatsappUrl, "_blank");
}

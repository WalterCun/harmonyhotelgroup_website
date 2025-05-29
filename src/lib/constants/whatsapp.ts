// WhatsApp related constants
export const whatsappNumber = import.meta.env.PUBLIC_WHATSAPP_NUMBER;

// Función útil para generar enlaces de WhatsApp con mensajes predefinidos
export const formatWhatsAppText = (message: string) => {
	const encodedMessage = encodeURIComponent(message);
	return `https://wa.me/${whatsappNumber}${message ? `?text=${encodedMessage}` : ""}`;
};
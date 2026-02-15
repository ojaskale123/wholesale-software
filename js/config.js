// js/config.js

/**
 * WhatsApp configuration
 * ---------------------------------
 * IMPORTANT:
 * - This project DOES NOT use WhatsApp Cloud API
 * - No access tokens
 * - No phone number IDs
 * - Messages are sent via WhatsApp Web (manual click by shopkeeper)
 */

export const WHATSAPP_CONFIG = {
  COUNTRY_CODE: "91",          // Default India
  USE_WHATSAPP_WEB: true       // Safety flag
};

/**
 * Build WhatsApp Web URL (SAFE METHOD)
 * Only shopkeeper should call this
 */
export function buildWhatsAppUrl(phone, message) {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${WHATSAPP_CONFIG.COUNTRY_CODE}${cleanPhone}?text=${encodeURIComponent(message)}`;
}

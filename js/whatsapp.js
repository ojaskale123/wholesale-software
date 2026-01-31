// js/whatsapp.js
import { WHATSAPP_CONFIG } from "./config.js";

export async function sendWhatsAppTemplate({ to, templateName, bodyParams }) {
  const url = `https://graph.facebook.com/v18.0/${WHATSAPP_CONFIG.PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: bodyParams.map(text => ({
            type: "text",
            text: String(text)
          }))
        }
      ]
    }
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log("WhatsApp response:", data);

  } catch (err) {
    console.error("WhatsApp error:", err);
  }
}

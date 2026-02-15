// js/manualWhatsapp.js

export async function sendManualWhatsApp({
  templateKey,
  phone,
  variables = {}
}) {
  try {
    // Load template JSON
    const res = await fetch("../config/messages.json");
    const templates = await res.json();

    if (!templates[templateKey]) {
      alert("Message template not found.");
      return;
    }

    let message = templates[templateKey].text;

    // Replace {{variables}}
    Object.keys(variables).forEach(key => {
      const value = variables[key] || "";
      message = message.replaceAll(`{{${key}}}`, value);
    });

    // Encode message
    const encoded = encodeURIComponent(message);

    // Clean phone (remove + or spaces)
    const cleanPhone = phone.replace(/\D/g, "");

    // Open WhatsApp
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, "_blank");

  } catch (err) {
    console.error("WhatsApp manual error:", err);
    alert("Failed to load message template.");
  }
}

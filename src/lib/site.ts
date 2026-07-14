export const SITE = {
  name: "Horizon 7 Company Ltd",
  short: "Horizon 7",
  tagline: "Engineering Excellence. Industrial Precision. Built for Tomorrow.",
  description:
    "Horizon 7 Company Ltd delivers world-class engineering, fabrication, construction and industrial solutions across Cameroon and Central Africa.",
  email: "info@hashtagnexasmartai.org",
  whatsapp: "+237 678 258 919",
  whatsappRaw: "237678258919",
  address: "Douala, Cameroon",
  hours: "Mon – Fri · 08:00 – 18:00 WAT",
  mapEmbed:
    "https://www.google.com/maps?q=Douala%2C+Cameroon&output=embed",
  mapLink: "https://maps.app.goo.gl/ZFV5Hb45SKfCL5gv9",
};

export function waLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappRaw}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailLink(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${SITE.email}${qs ? `?${qs}` : ""}`;
}

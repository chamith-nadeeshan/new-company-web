import { siWhatsapp } from "simple-icons";
import { siteConfig } from "@/config/site";

// Floating WhatsApp button pinned bottom-right on every page (rendered in the
// root layout). Opens a chat with the business number via the wa.me deep link.
export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp.number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp (${siteConfig.whatsapp.display})`}
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={siWhatsapp.path} />
      </svg>
    </a>
  );
}

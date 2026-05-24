import PageHero from "@/components/sections/PageHero";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import ContactPageContent from "./ContactPageContent";

export default async function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="Speak With a Specialist"
        headline="We're here when you're ready to act."
        body="Your first call is free, confidential, and judgment-free. We listen first, then walk you through exactly what comes next for your family."
        primaryCta={{ label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF }}
        secondaryCta={undefined as unknown as { label: string; href: string }}
        showTrustLine={false}
        image="https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ai_contact_hero01.jpg"
        imageAlt="Addiction interventionist consulting with a family at a table"
      />

      <ContactPageContent />
    </main>
  );
}

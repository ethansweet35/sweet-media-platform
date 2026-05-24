import PageHero from "@/components/sections/PageHero";
import BottomCta from "@/components/sections/BottomCta";
import FaqsPageContent from "./FaqsPageContent";

export default async function FaqsPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="Frequently Asked Questions"
        headline="Honest answers from certified interventionists."
        body="The most common questions families ask before, during, and after an intervention. Don't see yours? Pick up the phone — we'll answer it."
        image="https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ai_faqs_hero01.jpg"
        imageAlt="Family and counselor in a group discussion setting"
      />

      <FaqsPageContent />

      <BottomCta
        title="Don't see your question?"
        body="If something is on your mind that we haven't answered here, we want to hear it. Your first call is free, confidential, and judgment-free."
      />
    </main>
  );
}

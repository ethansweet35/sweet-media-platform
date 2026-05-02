import SiteHeader from "@/components/feature/SiteHeader";
import ContactHero from "@/components/pages/contact/components/ContactHero";
import ContactForm from "@/components/pages/contact/components/ContactForm";
import ContactInfo from "@/components/pages/contact/components/ContactInfo";
import Footer from "@/components/pages/home/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader ctaLabel="Free Strategy Call" ctaHref="#contact-form" heroTheme="dark" />
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <Footer />
    </div>
  );
}

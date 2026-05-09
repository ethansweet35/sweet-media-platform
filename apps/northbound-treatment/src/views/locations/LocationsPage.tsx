import Image from "next/image";
import Link from "next/link";
import PageHero from "@/views/shared/PageHero";
import CtaBanner from "@/views/shared/CtaBanner";
import { LOCATION_IMAGES } from "@/views/home/assets";

const HERO_IMAGE =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_locations_hero01.jpg";

const LOCATIONS = [
  {
    name: "Newport Beach",
    tagline: "Our Flagship Southern California Campus",
    state: "California",
    address: "3822 Campus Dr, Suite 200, Newport Beach, CA 92660",
    href: "/locations/california/newport-beach/",
    image: LOCATION_IMAGES.newportBeach,
    alt: "Northbound Treatment Newport Beach campus — coastal Southern California recovery environment",
    levelOfCare: "All Levels",
    ages: "18+",
    programLength: "30–90 Days",
    description:
      "Located in the heart of sunny Orange County, just steps from 42 miles of pristine Pacific coastline. Our Newport Beach campus is home to seven integrated buildings offering medically supervised detox, residential treatment for men and women, and comfortable sober living — all within a recovery-friendly coastal community.",
    highlights: [
      { icon: "ri-building-2-line", text: "7 Integrated Treatment Buildings" },
      { icon: "ri-sun-line", text: "Daily Beach, Surfing & Outdoor Activities" },
      { icon: "ri-heart-pulse-line", text: "Detox, Residential, PHP, IOP & Sober Living" },
      { icon: "ri-music-line", text: "Music Rooms, Gardens, Yoga & Meditation Spaces" },
    ],
    accent: "terracotta" as const,
  },
  {
    name: "Garden Grove",
    tagline: "Primary Residential & Medical Detox Hub",
    state: "California",
    address: "9842 13th Street, Garden Grove, CA 92844",
    href: "/locations/california/garden-grove/",
    image: LOCATION_IMAGES.gardenGrove,
    alt: "Northbound Treatment Garden Grove campus — primary residential detox facility Orange County",
    levelOfCare: "Detox & Residential",
    ages: "18+",
    programLength: "28–90 Days",
    description:
      "Nicknamed 'The Grove,' our Garden Grove campus is Northbound's primary residential and medical detox facility — a place where the seeds of recovery are planted. Located just one mile from Disneyland and 20 minutes from the beach, this ethnically vibrant community provides an ideal setting for immersive, real-world recovery.",
    highlights: [
      { icon: "ri-hospital-line", text: "Medically Supervised Detox — 24/7 Clinical Staff" },
      { icon: "ri-restaurant-line", text: "Catered Meals, Memory Foam Beds & On-Site Fire Pit" },
      { icon: "ri-body-scan-line", text: "On-Site Gym, Volleyball & Instructor-Led Yoga" },
      { icon: "ri-group-line", text: "Alumni Weekly Meetings & 12-Step Immersion" },
    ],
    accent: "navy" as const,
  },
  {
    name: "San Diego",
    tagline: "La Jolla Boutique Outpatient Center",
    state: "California",
    address: "7924 Ivanhoe Ave, Suite 7, La Jolla, CA 92037",
    href: "/locations/california/san-diego/",
    image: LOCATION_IMAGES.sanDiego,
    alt: "Northbound Treatment San Diego La Jolla campus — boutique outpatient and transitional living",
    levelOfCare: "PHP, IOP & Outpatient",
    ages: "18+",
    programLength: "Flexible",
    description:
      "Situated in beautiful La Jolla — surrounded by 7 miles of sun-kissed beaches, scenic coastal trails, and a vibrant recovery community — our San Diego facility offers boutique outpatient and transitional programming for those stepping down from residential care or beginning recovery closer to home.",
    highlights: [
      { icon: "ri-water-flash-line", text: "7 Miles of Beach, Tide Pools & Coastal Trails" },
      { icon: "ri-briefcase-4-line", text: "Careerbound® Resource Center" },
      { icon: "ri-mental-health-line", text: "PHP, IOP & Dual Diagnosis Services" },
      { icon: "ri-community-line", text: "Strong Local Sober Community" },
    ],
    accent: "terracotta" as const,
  },
  {
    name: "Seattle",
    tagline: "Pacific Northwest Admissions & Support Hub",
    state: "Washington",
    address: "2120 1st Ave N, Unit 313, Seattle, WA 98109",
    href: "/locations/washington/seattle/",
    image: LOCATION_IMAGES.seattle,
    alt: "Northbound Treatment Seattle Washington — Pacific Northwest admissions hub",
    levelOfCare: "All Levels (via SoCal Campuses)",
    ages: "18+",
    programLength: "30–90 Days",
    description:
      "Northbound's Pacific Northwest hub connects Washington State residents to our full continuum of care. Seattle-area clients are welcomed to participate in our licensed residential and detox programs at our Southern California campuses — with local intake support, family coordination, and ongoing aftercare resources available in Seattle.",
    highlights: [
      { icon: "ri-map-pin-2-line", text: "Local Intake & Family Support Team" },
      { icon: "ri-plane-line", text: "Assisted Travel to SoCal Campus" },
      { icon: "ri-phone-line", text: "24/7 Admissions Hotline" },
      { icon: "ri-heart-line", text: "Post-Treatment Washington State Aftercare" },
    ],
    accent: "navy" as const,
  },
];

const WHY_FEATURES = [
  {
    icon: "ri-sun-line",
    title: "Year-Round Healing Climate",
    body: "Southern California's 280+ days of sunshine aren't just pleasant — research confirms that sunlight, fresh air, and outdoor activity measurably reduce depression and anxiety symptoms during recovery.",
  },
  {
    icon: "ri-water-flash-line",
    title: "Ocean Access & Nature Integration",
    body: "Surfing twice a week, beach bonfires, coastal hikes, and meditation by the water. Our environment is itself a therapeutic tool — not just a backdrop.",
  },
  {
    icon: "ri-community-line",
    title: "Real-World Community Recovery",
    body: "Our InVivo® model places clients in vibrant, real communities — not isolated campuses. Grocery runs, campus visits, and neighborhood integration build the real-world skills that prevent relapse.",
  },
  {
    icon: "ri-building-line",
    title: "Proximity to Education & Careers",
    body: "Each location was chosen for its proximity to leading universities, career centers, and thriving communities — supporting our Collegebound® and Careerbound® reintegration programs.",
  },
];

export default function LocationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Treatment Locations"
        headline="Drug & Alcohol Rehab Centers Built for Healing"
        italicWord="Healing"
        body="Northbound operates multiple treatment campuses across Southern California and the Pacific Northwest — each environment mindfully chosen to support deep, lasting recovery through beauty, community, and clinical excellence."
        image={HERO_IMAGE}
        imageAlt="Aerial view of Newport Beach Southern California coastline at golden hour — Northbound Treatment location"
        breadcrumbs={[{ label: "Locations" }]}
        primaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
        secondaryCta={{ label: "Verify My Insurance", href: "/admissions/insurance-coverage/" }}
      />

      {/* Intro Philosophy */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                Environment as Medicine
              </p>
              <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl leading-tight">
                Your environment shapes your <span className="italic text-terracotta">recovery.</span>
              </h2>
              <p className="mt-5 leading-relaxed text-navy/70">
                At Northbound, we believe your surroundings aren't incidental to healing — they're essential to it. Every one of our treatment locations was chosen with intention: for its natural beauty, its community infrastructure, its proximity to real life, and its capacity to inspire hope.
              </p>
              <p className="mt-4 leading-relaxed text-navy/70">
                Our facilities are not isolated institutions removed from the world. They are fully integrated into vibrant, diverse communities — because the lessons learned in the real world are easier to practice in the real world.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { value: "4", label: "Treatment Campuses" },
                  { value: "38+", label: "Years in Operation" },
                  { value: "10K+", label: "Lives Transformed" },
                  { value: "15+", label: "Insurance Plans Accepted" },
                ].map((stat) => (
                  <div key={stat.label} className="border border-navy/10 p-5">
                    <p className="font-heading text-3xl font-bold text-terracotta">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-navy/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {WHY_FEATURES.map((f) => (
                <div key={f.title} className="bg-sand-light p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center bg-terracotta/10">
                    <i className={`${f.icon} text-lg text-terracotta`} />
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-navy">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-navy/60">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location Cards */}
      <section className="bg-sand-light py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
              Our Campuses
            </p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
              Find the Right Location for Your Recovery
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-navy/60">
              Every Northbound campus offers the same commitment to evidence-based, individualized care — with environments tailored to support your unique recovery journey.
            </p>
          </div>

          <div className="space-y-8">
            {LOCATIONS.map((loc, idx) => (
              <div
                key={loc.name}
                className={`grid overflow-hidden bg-white shadow-sm lg:grid-cols-[2fr_3fr] ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`}
              >
                {/* Image */}
                <div className="relative min-h-[280px] lg:min-h-[340px]">
                  <Image
                    src={loc.image}
                    alt={loc.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                  {/* State badge */}
                  <div className={`absolute left-4 top-4 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${loc.accent === "terracotta" ? "bg-terracotta text-white" : "bg-navy text-white"}`}>
                    {loc.state}
                  </div>
                  {/* Care level pill */}
                  <div className="absolute bottom-4 left-4 right-4 bg-navy/80 px-4 py-2 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80">
                      <span>Level of Care: <span className="text-terracotta">{loc.levelOfCare}</span></span>
                      <span>{loc.programLength}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-terracotta">
                      {loc.tagline}
                    </p>
                    <h3 className="font-heading text-3xl font-bold text-navy">{loc.name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-navy/50">
                      <i className="ri-map-pin-2-line text-terracotta" />
                      {loc.address}
                    </p>
                    <p className="mt-4 leading-relaxed text-navy/70">{loc.description}</p>

                    {/* Highlights */}
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {loc.highlights.map((h) => (
                        <li key={h.text} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-terracotta/10">
                            <i className={`${h.icon} text-xs text-terracotta`} />
                          </span>
                          <span className="text-xs leading-relaxed text-navy/70">{h.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-navy/10 pt-6">
                    <Link
                      href={loc.href}
                      className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition ${loc.accent === "terracotta" ? "bg-terracotta hover:bg-terracotta-light" : "bg-navy hover:bg-navy/80"}`}
                    >
                      View This Campus <i className="ri-arrow-right-line" />
                    </Link>
                    <Link
                      href="tel:8663110003"
                      className="inline-flex items-center gap-2 border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition hover:border-navy/40 hover:bg-navy/5"
                    >
                      <i className="ri-phone-line text-terracotta" /> Call (866) 311-0003
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation & Trust Strip */}
      <section className="bg-navy py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "ri-shield-check-line", title: "DHCS Licensed", sub: "License #300661CP" },
              { icon: "ri-award-line", title: "NAATP Member", sub: "Highest Ethical Standards" },
              { icon: "ri-verified-badge-line", title: "38 Years in Operation", sub: "Founded 1988" },
              { icon: "ri-insurance-line", title: "15+ Insurance Plans", sub: "In-Network Provider" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 border border-white/10 bg-white/5 px-5 py-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-terracotta/20">
                  <i className={`${item.icon} text-lg text-terracotta`} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-white/50">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance note + admissions */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                Out-of-State Admissions
              </p>
              <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">
                More than half of our clients travel from out of state.
              </h2>
              <p className="mt-4 leading-relaxed text-navy/70">
                The quality of Northbound's programs draws clients from across the country. Our admissions team coordinates every step of travel — from benefits verification and intake paperwork to travel logistics and family communication — so your only job is to arrive ready to heal.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Free insurance benefits verification within 24 hours",
                  "Same-day admissions available in many cases",
                  "Travel coordination support for out-of-state clients",
                  "Family liaison program to keep loved ones informed",
                  "No Medicaid — affordable self-pay options available",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-navy/70">
                    <i className="ri-check-line mt-0.5 shrink-0 text-terracotta" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-sand-light p-8 lg:p-10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                Ready to Take the First Step?
              </p>
              <h3 className="font-heading text-2xl font-bold text-navy">
                Our admissions team is available 24/7.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/70">
                Whether you're local to Orange County or calling from across the country, we can help you find the right program at the right Northbound location — at no cost or obligation to you.
              </p>
              <div className="mt-8 space-y-3">
                <Link
                  href="tel:8663110003"
                  className="flex w-full items-center justify-center gap-2 bg-terracotta py-4 text-sm font-semibold text-white transition hover:bg-terracotta-light"
                >
                  <i className="ri-phone-fill" /> Call (866) 311-0003
                </Link>
                <Link
                  href="/admissions/"
                  className="flex w-full items-center justify-center gap-2 border border-navy/20 py-4 text-sm font-semibold text-navy transition hover:border-navy/40"
                >
                  Start Admissions Process <i className="ri-arrow-right-line" />
                </Link>
              </div>
              <p className="mt-4 text-center text-xs text-navy/40">
                Free assessment · No obligation · Confidential
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        headline="Recovery Is Possible — Wherever You Start"
        body="Contact our admissions team today to learn which Northbound campus is the right fit for you or your loved one. We verify insurance, answer every question, and guide you through every step."
        primaryCta={{ label: "Call (866) 311-0003", href: "tel:8663110003" }}
        secondaryCta={{ label: "Verify My Insurance", href: "/admissions/insurance-coverage/" }}
      />
    </>
  );
}

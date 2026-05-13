import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import IconCircle from "@/components/ui/IconCircle";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const leftFeatures = [
  { icon: "ri-home-2-line",    title: "Intimate Setting",    desc: "Maximum 12 clients for personalized attention" },
  { icon: "ri-settings-3-line",title: "Coastal Sanctuary",   desc: "Surrounded by California's healing landscape" },
  { icon: "ri-star-line",      title: "Premium Comfort",     desc: "Every detail curated for your restoration" },
  { icon: "ri-group-line",     title: "Executive Privacy",   desc: "Discretion and confidentiality guaranteed" },
];

const amenities = [
  { title: "Private Sound-Dampened Suites",  desc: "Organic linens, en-suite baths, and coastal views.",                           category: "Accomdations" },
  { title: "Executive Culinary Program",     desc: "On-site private chefs catering to neuro-nutritional recovery.",                 category: "Nutrition" },
  { title: "Holistic Modalities",            desc: "Ocean-view yoga, massage therapy, and somatic breathwork.",                     category: "Wellness" },
  { title: "Equestrian & Equine Therapy",    desc: "Partnering with local stables for non-verbal emotional processing.",            category: "Experiential" },
  { title: "Executive Connectivity",         desc: "Dedicated quiet workspaces for those who must maintain professional duties.",    category: "Amenities" },
];

export default function EnvironmentSection() {
  return (
    <section className="bg-ink">
      <SectionWrapper className="grid lg:grid-cols-[360px_1fr] gap-12 items-start min-h-[794px]">
        {/* Left — stone card */}
        <div className="bg-muted/25 p-10 flex flex-col gap-1">
          <Eyebrow className="mb-5">The Environment</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-normal text-white leading-[1.1]">
            An Architecture,
            <br />
            <em className="italic text-white/60">Of Peace</em>
          </h2>
          <p className="mt-2 text-sm font-light text-white/50"><AutoLinkedText>{"Orange County, California"}</AutoLinkedText></p>

          <div className="mt-10 flex flex-col gap-6">
            {leftFeatures.map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <IconCircle icon={icon} variant="ink" size="xs" />
                <div>
                  <p className="text-lg font-normal text-white"><AutoLinkedText>{title}</AutoLinkedText></p>
                  <p className="text-sm font-light text-white/45"><AutoLinkedText>{desc}</AutoLinkedText></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — description + amenity list */}
        <div>
          <p className="text-[15px] font-light leading-relaxed text-white/65 mb-10">
            <AutoLinkedText>{"We do not believe that clinical excellence must come at the expense of comfort. Rize was designed from the ground up to remove friction, stimulate the senses, and provide an uncompromisingly premium backdrop for your recovery."}</AutoLinkedText>
          </p>

          <div className="flex flex-col divide-y divide-white/10">
            {amenities.map(({ title, desc, category }) => (
              <div key={title} className="flex items-start justify-between gap-6 py-7">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-[28px] font-normal text-white">{title}</h3>
                  <p className="mt-1 text-sm font-light text-white/50"><AutoLinkedText>{desc}</AutoLinkedText></p>
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/35 shrink-0 mt-1">
                  {category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}

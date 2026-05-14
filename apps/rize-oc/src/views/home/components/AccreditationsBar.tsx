import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

const accreditations = [
  { logo: `${BASE}/accred-jc.png`,          label: "Joint Commission",      width: 120, height: 44 },
  { logo: `${BASE}/accred-legitscript.svg`, label: "Legitscript Certified", width: 140, height: 36 },
  { logo: `${BASE}/accred-dhcs.svg`,        label: "DHCS Licensed",         width: 100, height: 40 },
  { logo: `${BASE}/accred-asam.svg`,        label: "ASAM Certified",        width: 110, height: 44 },
];

export default function AccreditationsBar() {
  return (
    <div className="bg-ink">
      <SectionWrapper py="py-[56px]" className="flex flex-col items-center gap-6">
        <Eyebrow colorClass="text-accent">Uncompromising Clinical Standards</Eyebrow>
        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {accreditations.map(({ logo, label, width, height }) => (
            <div key={label} className="flex flex-col items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo}
                alt={label}
                width={width}
                height={height}
                style={{ filter: "brightness(0) invert(1)", opacity: 0.75, maxHeight: `${height}px`, width: "auto" }}
              />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">{label}</span>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { AutoLinkedText } from "@sweetmedia/blog-core";

const tracks = [
  {
    tag: 'Most Structured',
    tagColor: '#C8795A',
    title: 'Virtual Intensive Outpatient',
    subtitle: 'IOP Track',
    duration: '3 Days / Week · 3 Hrs / Day',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/prog_iop01.jpg',
    desc: 'Structured, therapist-led group and individual sessions three days a week — all from the privacy and comfort of your own home.',
    path: '/virtual-outpatient',
  },
  {
    tag: 'Flexible Support',
    tagColor: '#6B7D67',
    title: 'Virtual Standard Outpatient',
    subtitle: 'OP Track',
    duration: '1–2 Sessions / Week',
    image: 'https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/prog_op01.jpg',
    desc: 'Continued therapeutic support on a flexible schedule — individual therapy, group sessions, and community connection.',
    path: '/virtual-outpatient',
  },
];

export default function ProgramsSection() {
  return (
    <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Header + cards side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 items-center">

          {/* Left: header */}
          <div className="flex flex-col gap-5 anim-fade-right anim-visible">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C8795A] font-medium">Our Program</span>
            <h2 className="font-serif text-[#2C3B2E] leading-[1.2]" style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}>
              Virtual Outpatient Care
            </h2>
            <p className="text-[#3A4A3C]/60 font-light text-sm leading-relaxed">
              <AutoLinkedText>{"Two tracks, one goal — your lasting recovery. Choose the level of structure that fits your life."}</AutoLinkedText>
            </p>
            <div className="flex flex-col gap-2.5 pt-2">
              {[
                { icon: 'ri-computer-line', label: '100% Virtual' },
                { icon: 'ri-shield-check-line', label: 'HIPAA Secure' },
                { icon: 'ri-map-pin-line', label: 'Colorado Residents' },
                { icon: 'ri-group-line', label: 'Women-Only Groups' },
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[#3A4A3C]/55">
                  <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <i className={`${b.icon} text-sm text-[#6B7D67]`}></i>
                  </div>
                  <span className="text-xs font-light">{b.label}</span>
                </div>
              ))}
            </div>
            <Link
              href="/virtual-outpatient"
              className="whitespace-nowrap cursor-pointer self-start inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#2C3B2E] text-[#2C3B2E] text-xs uppercase tracking-widest font-medium hover:bg-[#2C3B2E] hover:text-[#FAF8F5] transition-all duration-300 mt-2"
            >
              Learn More
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          {/* Right: two cards side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tracks.map((track, i) => (
              <Link
                key={i}
                href={track.path}
                className={`group bg-[#FAF8F5] rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:scale-[1.02] transition-transform duration-300 anim-fade-up anim-delay-${i + 1} anim-visible`}
              >
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
  src={track.image}
  alt={track.title}
  fill
  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
  loading="lazy"
/>
                  <div className="absolute top-3 left-3">
                    <span
                      className="text-[10px] uppercase tracking-widest font-medium px-3 py-1 rounded-full text-[#FAF8F5]"
                      style={{ backgroundColor: track.tagColor }}
                    >
                      {track.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2.5 flex-1">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-medium mb-0.5" style={{ color: track.tagColor }}><AutoLinkedText>{track.subtitle}</AutoLinkedText></p>
                    <h3 className="font-serif text-[#2C3B2E] text-base leading-snug">{track.title}</h3>
                  </div>
                  <p className="text-xs text-[#3A4A3C]/60 font-light leading-relaxed flex-1"><AutoLinkedText>{track.desc}</AutoLinkedText></p>
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#F0ECE1]">
                    <span className="text-[10px] font-medium uppercase tracking-wide" style={{ color: track.tagColor }}>{track.duration}</span>
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-arrow-right-line text-sm text-[#6B7D67] group-hover:translate-x-1 transition-transform duration-300"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

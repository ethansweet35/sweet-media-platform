import Image from 'next/image';
import Link from 'next/link';
import { AutoLinkedText } from "@sweetmedia/blog-core";

export default function CTASection() {
  return (
    <section className="w-full bg-[#F0ECE1] py-24 px-8 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Image Banner */}
        <div className="relative rounded-[3rem_1rem_3rem_1rem] overflow-hidden mb-14 anim-scale anim-visible" style={{ height: '420px' }}>
          <div className="absolute inset-0">
            <Image
              src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/cta001.jpg"
              alt="Begin your healing journey"
              fill
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3B2E]/70 via-[#2C3B2E]/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10">
            <p className="font-serif text-[#FAF8F5] leading-[1.15]" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
              Your healing begins with<br />
              one <em className="text-[#DDA15E]">brave</em> step.
            </p>
          </div>
        </div>

        {/* CTA Content */}
        <div className="flex flex-col items-center text-center gap-6 anim-fade-up anim-visible">
          <p className="text-[#3A4A3C]/70 font-light text-base max-w-xl leading-relaxed">
            <AutoLinkedText>{"You don't have to have it all figured out. You just have to be willing to begin. Our compassionate intake team is ready to walk alongside you — no pressure, no judgment, just care."}</AutoLinkedText>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#2C3B2E] text-[#FAF8F5] text-sm uppercase tracking-widest font-medium hover:bg-[#C8795A] transition-all duration-300"
            >
              Schedule a Free Call
              <i className="ri-phone-line"></i>
            </Link>
            <Link
              href="/what-we-treat"
              className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-10 py-4 rounded-full border border-[#2C3B2E] text-[#2C3B2E] text-sm uppercase tracking-widest font-medium hover:bg-[#2C3B2E] hover:text-[#FAF8F5] transition-all duration-300"
            >
              What We Treat
            </Link>
          </div>
          <p className="text-xs text-[#6B7D67] font-light">
            <AutoLinkedText>{"Confidential · Insurance Accepted · Available 24/7"}</AutoLinkedText>
          </p>
        </div>
      </div>
    </section>
  );
}

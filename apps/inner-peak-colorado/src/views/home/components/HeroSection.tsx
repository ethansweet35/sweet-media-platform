import Image from 'next/image';
import Link from 'next/link';
import HeroContactForm from './HeroContactForm';


export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background — image always rendered (mobile fallback + while video loads) */}
      <div className="absolute inset-0">
        <Image
          src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/hero002.jpg"
          alt="Inner Peak Colorado hero"
          fill
          className="w-full h-full object-cover object-center"
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={35}
        />

        {/* Video — desktop only, layered over image so image shows while video loads */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover object-center hidden md:block"
        >
          <source src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/grok-video-583279ae-196f-4af0-a283-83017649a759%20(1).webm" type="video/webm" />
          <source src="https://papiwmobmdbtzeeebmpr.supabase.co/storage/v1/object/public/site-assets/images/grok-video-583279ae-196f-4af0-a283-83017649a759%20(1).mp4" type="video/mp4" />
        </video>

        {/* Overlays — lightened so video content is more visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C3B2E]/85 via-[#2C3B2E]/60 to-[#2C3B2E]/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C3B2E]/25 via-transparent to-[#2C3B2E]/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 pt-28 pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — headline + CTAs */}
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#DDA15E]"></div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#DDA15E] font-medium">
                Colorado · Women-Only · Virtual
              </span>
            </div>

            <h1 className="font-serif text-[#FAF8F5] leading-[1.1]" style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}>
              Virtual Mental Healthcare,<br className="hidden sm:block" />
              <em className="text-[#DDA15E] not-italic">For Women.</em>
            </h1>

            <p className="text-[#F0ECE1]/80 font-light text-base leading-[1.85] max-w-md">
              Colorado's women-only virtual outpatient program — delivering evidence-based, trauma-informed mental health and addiction treatment from the comfort of your own home.
            </p>

            <div className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/admissions"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8795A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#DDA15E] transition-all duration-300"
              >
                Start Admissions
                <i className="ri-arrow-right-line"></i>
              </Link>
              <Link
                href="/levels-of-care"
                className="whitespace-nowrap cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#FAF8F5]/50 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:border-[#FAF8F5] hover:bg-[#FAF8F5]/10 transition-all duration-300"
              >
                Our Program
              </Link>
            </div>

            <div className="flex flex-wrap gap-5 pt-2">
              {[
                { icon: 'ri-map-pin-line', label: 'Colorado Residents Only' },
                { icon: 'ri-lock-line', label: 'HIPAA Compliant' },
                { icon: 'ri-time-line', label: 'Intake Available 24/7' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`${badge.icon} text-[#8FA489] text-sm`}></i>
                  </div>
                  <span className="text-[11px] text-[#FAF8F5]/60 font-light tracking-wide">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — contact form */}
          <HeroContactForm />

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#FAF8F5]/40">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#FAF8F5]/40 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}

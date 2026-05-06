const testimonials = [
  {
    quote:
      'My daughter came in completely shut down and resistant. Three months later she\'s laughing again, doing well in school, and actually talks to me. I don\'t have words for how grateful I am.',
    author: 'Jennifer M.',
    role: 'Parent of 16-year-old',
    featured: true,
  },
  {
    quote:
      'I was skeptical about group therapy but it changed everything. Knowing other teens were going through the same thing made me feel less alone. My therapist actually got me.',
    author: 'Alex R.',
    role: 'Patient, Age 17',
    featured: false,
  },
  {
    quote:
      'The intake team made us feel heard from the very first call. They explained everything clearly, worked with our insurance, and got my son into the program within a week.',
    author: 'David & Sarah T.',
    role: 'Parents of 14-year-old',
    featured: false,
  },
  {
    quote:
      'After two hospitalizations, we were desperate. This program finally gave our teenager the consistent, specialized care that made the real difference. We wish we had found them sooner.',
    author: 'Maria C.',
    role: 'Parent of 15-year-old',
    featured: false,
  },
  {
    quote:
      'The family therapy sessions helped us understand what our son was going through. Our whole family dynamic changed for the better.',
    author: 'Kevin W.',
    role: 'Parent of 13-year-old',
    featured: false,
  },
  {
    quote:
      'I was terrified to ask for help. But from day one the staff made me feel safe and not judged. I\'ve actually started to like who I am — something I never thought I\'d say.',
    author: 'Taylor B.',
    role: 'Patient, Age 16',
    featured: false,
  },
];

const ratingStats = [
  { value: '4.9', label: 'Average rating' },
  { value: '300+', label: 'Verified reviews' },
  { value: '92%', label: 'Complete treatment' },
  { value: '97%', label: 'Would recommend' },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 md:py-28 bg-whisper-gray">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-end mb-16">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-ash font-medium">
              Testimonials
            </span>
            <h2
              className="text-midnight-ink font-black leading-[1.0]"
              style={{ fontSize: 'clamp(38px, 4.5vw, 60px)', letterSpacing: '-0.03em' }}
            >
              Families who found
              <br />
              their way through.
            </h2>
          </div>
          <p className="text-[15px] text-muted-ash font-light leading-[1.8] lg:pb-1">
            Real stories from real families. Names and identifying details have been
            changed to protect privacy.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="bg-midnight-ink rounded-2xl px-8 md:px-12 py-10 md:py-12 mb-4">
          <div className="flex gap-3 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#e8400d" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <p
            className="text-canvas-white/90 font-light leading-[1.75] mb-8"
            style={{ fontSize: 'clamp(16px, 2vw, 20px)' }}
          >
            &ldquo;{testimonials[0].quote}&rdquo;
          </p>
          <div className="flex items-center gap-4 pt-6 border-t border-canvas-white/[0.08]">
            <div className="w-8 h-8 rounded-full bg-phoenix-orange/20 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8400d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <p className="text-canvas-white text-[13px] font-semibold tracking-tight">{testimonials[0].author}</p>
              <p className="text-canvas-white/40 text-[11px] font-light">{testimonials[0].role}</p>
            </div>
          </div>
        </div>

        {/* Secondary grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {testimonials.slice(1).map(({ quote, author, role }) => (
            <div
              key={author}
              className="sm:first:col-span-1 lg:col-span-1 bg-canvas-white rounded-2xl p-6 flex flex-col gap-4 border border-black/[0.05]"
            >
              <div className="flex gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#e8400d" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-[13px] text-midnight-ink font-light leading-[1.7] flex-1">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="pt-3 border-t border-black/[0.06]">
                <p className="text-[12px] font-semibold text-midnight-ink tracking-tight">{author}</p>
                <p className="text-[11px] text-muted-ash font-light mt-0.5">{role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rating stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ratingStats.map(({ value, label }) => (
            <div key={label} className="bg-canvas-white rounded-2xl px-6 py-5 text-center border border-black/[0.05]">
              <p
                className="text-midnight-ink font-black leading-none mb-1.5"
                style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', letterSpacing: '-0.04em' }}
              >
                {value}
              </p>
              <p className="text-[11px] text-muted-ash uppercase tracking-[0.1em] font-medium">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

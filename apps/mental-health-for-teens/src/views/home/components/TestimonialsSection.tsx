const testimonials = [
  {
    quote: "My daughter came in completely shut down and resistant. Three months later she's laughing again, doing well in school, and actually talks to me. I don't have words for how grateful I am.",
    author: 'Jennifer M.',
    role: 'Parent of 16-year-old',
    color: 'bg-petal-pink',
  },
  {
    quote: "I was skeptical about group therapy but it changed everything. Knowing other teens were going through the same thing made me feel less alone. My therapist actually got me.",
    author: 'Alex R.',
    role: 'Patient, Age 17',
    color: 'bg-mint-green',
  },
  {
    quote: "The intake team made us feel heard from the very first call. They explained everything clearly, worked with our insurance, and got my son into the program within a week.",
    author: 'David & Sarah T.',
    role: 'Parents of 14-year-old',
    color: 'bg-subtle-lavender',
  },
  {
    quote: "After two hospitalizations, we were desperate. This program finally gave our teenager the consistent, specialized care that made the real difference. We wish we had found them sooner.",
    author: 'Maria C.',
    role: 'Parent of 15-year-old',
    color: 'bg-canary-yellow',
  },
  {
    quote: "The family therapy sessions helped us understand what our son was going through. We learned how to support him without adding pressure. Our whole family dynamic changed for the better.",
    author: 'Kevin W.',
    role: 'Parent of 13-year-old',
    color: 'bg-petal-pink',
  },
  {
    quote: "I was terrified to ask for help. But from day one the staff made me feel safe and not judged. I've actually started to like who I am, and that's something I never thought I'd say.",
    author: 'Taylor B.',
    role: 'Patient, Age 16',
    color: 'bg-mint-green',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 bg-canvas-white">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

        {/* Header */}
        <div className="flex flex-col gap-4 mb-14 items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-whisper-gray">
            <span className="text-[11px] font-medium text-muted-ash uppercase tracking-widest">Testimonials</span>
          </div>
          <h2 className="text-[40px] font-bold text-midnight-ink leading-[1.1] tracking-tight max-w-xl">
            Families who found their way through
          </h2>
          <p className="text-[15px] text-muted-ash leading-[1.75] font-light max-w-lg">
            Real stories from real families. Names and identifying details have been changed to protect privacy.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {testimonials.map(({ quote, author, role, color }) => (
            <div
              key={author}
              className="break-inside-avoid bg-canvas-white rounded-xl p-6 flex flex-col gap-4"
              style={{ boxShadow: 'rgba(17, 17, 17, 0.05) 0px 0px 1px 0px, rgba(17, 17, 17, 0.04) 1px 1px 1px 0px, rgba(17, 17, 17, 0.03) 2px 3px 2px 0px, rgba(17, 17, 17, 0.01) 4px 4px 2px 0px' }}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#fbc768" stroke="#fbc768" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              {/* Quote */}
              <p className="text-[14px] text-midnight-ink leading-[1.7] font-light">
                &ldquo;{quote}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 mt-auto pt-2 border-t border-black/[0.06]">
                <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-midnight-ink tracking-tight">{author}</p>
                  <p className="text-[11px] text-muted-ash">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '4.9/5', label: 'Average Rating' },
            { value: '300+', label: 'Verified Reviews' },
            { value: '92%', label: 'Complete Treatment' },
            { value: '97%', label: 'Would Recommend' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-whisper-gray rounded-xl px-5 py-4 text-center">
              <p className="text-[28px] font-bold text-midnight-ink tracking-tight">{value}</p>
              <p className="text-[11px] text-muted-ash mt-1 tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

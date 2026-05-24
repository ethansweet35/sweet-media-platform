const BRAND_VIDEO = "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/videos/sr_brand_video.mp4";

export default function HomeMusicTherapy() {
  return (
    <section className="bg-[var(--sr-parchment)] py-[100px]">
      <div className="sr-container">

        {/* Top label row */}
        <div className="mb-16 flex items-center gap-8">
          <p
            className="shrink-0 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-fern)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Music Therapy
          </p>
          <div className="h-px flex-1 bg-[var(--sr-sand)]" />
          <p
            className="hidden shrink-0 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--sr-muted)] md:block"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Steven Shaw — Music Therapist
          </p>
        </div>

        {/* Main grid: image left, content right */}
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">

          {/* Left: guitar video */}
          <div className="relative w-full overflow-hidden bg-[var(--sr-charcoal)]" style={{ height: 540 }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover object-center"
            >
              <source src={BRAND_VIDEO} type="video/mp4" />
            </video>
          </div>

          {/* Right: content */}
          <div className="flex flex-col justify-center lg:pt-4">

            <h2
              className="mb-8 text-[clamp(2.5rem,4.5vw,4rem)] font-light leading-[1.05] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Sound is where<br />
              <em className="italic text-[var(--sr-fern)]">healing</em> begins.
            </h2>

            <div className="mb-8 h-px w-12 bg-[var(--sr-sand)]" />

            <p
              className="mb-5 text-[14px] leading-[1.9] text-[var(--sr-body)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              At Sullivan Recovery, we believe in the healing power of music. Our music therapy
              program — led by therapist Steven Shaw — is designed to complement your detox or
              residential treatment journey through the creative act of writing and recording your own music.
            </p>

            <p
              className="mb-10 text-[14px] leading-[1.9] text-[var(--sr-body)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Through sound, clients gain confidence, improve emotional regulation, and experience
              the transformative power of self-expression. Steven creates a safe, supportive space
              to explore vulnerability and discover strength through music.
            </p>

            {/* SoundCloud embed */}
            <div className="mb-3">
              <p
                className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--sr-muted)]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Patient recording — &ldquo;Crawling&rdquo; cover by Linkin Park
              </p>
              <iframe
                width="100%"
                height="120"
                scrolling="no"
                allow="autoplay; encrypted-media"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1852206972&color=%235C7A4E&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false"
                style={{ border: "none" }}
                title="Patient Music Therapy Recording — Crawling Cover"
              />
            </div>
            <p
              className="text-[12px] italic leading-relaxed text-[var(--sr-muted)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              A track recorded by one of our patients with Steven during their stay.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

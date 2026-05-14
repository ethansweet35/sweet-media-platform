const CONDITIONS = [
  { icon: "ri-mental-health-line", name: "Anxiety", body: "We provide tools for coping with excessive worry and fear." },
  { icon: "ri-heart-pulse-line", name: "Depression", body: "We help people rediscover joy and motivation in their lives." },
  { icon: "ri-shield-flash-line", name: "PTSD & Trauma", body: "We provide a safe space for processing difficult memories." },
  { icon: "ri-contrast-2-line", name: "Bipolar Disorder", body: "We provide support for managing the challenges of bipolar disorder." },
  { icon: "ri-user-heart-line", name: "Personality Disorder", body: "We help people develop healthier relationship skills." },
  { icon: "ri-brain-line", name: "Schizoaffective Disorder", body: "We offer support for families and loved ones." },
  { icon: "ri-refresh-line", name: "OCD", body: "We help people develop coping mechanisms for anxiety." },
  { icon: "ri-focus-3-line", name: "ADHD", body: "We help people develop strategies for managing impulsivity and inattention." },
];

export default function LpMhConditions() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="mb-12 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Individual, Group &amp; Family Therapy</p>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-ink"
            style={{ fontSize: "clamp(30px, 3.5vw, 48px)", lineHeight: 1.1 }}
          >
            Mental Health Conditions We Treat
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm font-light leading-relaxed text-ink/60">
            Mental health conditions can disrupt every aspect of life. At Rize OC, our counselors provide expert care for individuals struggling with a wide range of mental health issues.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONDITIONS.map((c) => (
            <div key={c.name} className="border border-warm/40 bg-[#F8F6F3] p-6">
              <i className={`${c.icon} text-accent text-2xl mb-3 block`} />
              <h3 className="font-medium text-ink mb-1.5">{c.name}</h3>
              <p className="text-sm font-light leading-relaxed text-ink/65">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-warm/40 bg-[#F8F6F3] p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Co-Occurring Disorders &amp; Dual Diagnosis</p>
          <p className="text-base font-light leading-relaxed text-ink/70 max-w-3xl">
            Many individuals who seek help for addiction also face co-occurring mental health disorders. At Rize OC, we provide a seamless approach to treating both conditions simultaneously, ensuring that the underlying issues contributing to both addiction and mental health struggles are addressed — significantly improving recovery outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}

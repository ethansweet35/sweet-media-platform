import Link from "next/link";

export default function DailyScheduleIntro() {
  return (
    <section className="border-b border-[var(--sr-sand)] bg-[var(--sr-parchment)] py-14 md:py-20">
      <div className="sr-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="sr-eyebrow mb-4">Why structure matters</p>
            <h2
              className="text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.08] text-[var(--sr-ink)]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Rhythm supports{" "}
              <span className="italic text-[var(--sr-fern)]">early sobriety</span>
            </h2>
          </div>
          <div
            className="space-y-4 text-[15px] leading-[1.8] text-[var(--sr-body)] lg:col-span-7"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <p>
              Early recovery can feel chaotic. A thoughtful daily schedule gives you anchors —
              meals, clinical checks, therapy, and personal time — so you can focus on healing
              instead of wondering what happens next.
            </p>
            <p>
              Schedules differ between{" "}
              <Link href="/programs/detox/" className="font-medium text-[var(--sr-fern)] hover:underline">
                medical detox
              </Link>{" "}
              and{" "}
              <Link
                href="/programs/residential-treatment/"
                className="font-medium text-[var(--sr-fern)] hover:underline"
              >
                residential treatment
              </Link>
              . Your clinician personalizes intensity as you stabilize.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

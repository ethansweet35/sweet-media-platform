import Link from "next/link";
import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";
import ProgramRegistrationForm from "@/components/marketing/ProgramRegistrationForm";
import type { RegistrationProgram } from "@/mocks/registration-programs";

interface ProgramRegistrationPageProps {
  program: RegistrationProgram;
}

export default function ProgramRegistrationPage({ program }: ProgramRegistrationPageProps) {
  return (
    <main className="bg-soft-white min-h-screen">
      <section className={`bg-pure-white ${PAGE_TOP_NAV_PADDING} pb-12 md:pb-16`}>
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <Link
            href="/meetings"
            className="inline-flex items-center gap-2 text-[14px] font-body font-medium text-tfrf-blue hover:text-deep-navy mb-8"
          >
            <i className="ri-arrow-left-line" />
            All meetings
          </Link>
          <p className="text-[12px] font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Registration
          </p>
          <h1 className="text-[clamp(28px,3.5vw,44px)] font-display text-deep-navy leading-[1.1] mb-4">
            {program.headline}
          </h1>
          <p className="text-[14px] font-body font-semibold text-tfrf-blue mb-4">{program.schedule}</p>
          <p className="text-[16px] font-body text-slate leading-relaxed max-w-2xl">{program.description}</p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <div className="max-w-md mx-auto">
            <ProgramRegistrationForm programSlug={program.slug} />
          </div>
        </div>
      </section>
    </main>
  );
}

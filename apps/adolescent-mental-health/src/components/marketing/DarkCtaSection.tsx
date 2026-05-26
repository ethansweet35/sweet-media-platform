import { CONTAINER } from "@/lib/site";
import Eyebrow from "./Eyebrow";
import Heading from "./Heading";
import { SECTION_PY } from "./tokens";

type DarkCtaSectionProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  actions: React.ReactNode;
};

export default function DarkCtaSection({
  eyebrow = "Get started",
  title,
  description,
  actions,
}: DarkCtaSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-dark px-6 lg:px-10 ${SECTION_PY}`}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[100px]" />
      <div className={`${CONTAINER} relative text-center`}>
        <Eyebrow dark>{eyebrow}</Eyebrow>
        <Heading as={2} light className="mt-4 text-4xl md:text-5xl">
          {title}
        </Heading>
        {description ? (
          <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-white/50">{description}</p>
        ) : null}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">{actions}</div>
      </div>
    </section>
  );
}

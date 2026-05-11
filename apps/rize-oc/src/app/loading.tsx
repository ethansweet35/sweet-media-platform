export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[var(--color-background)]">
      <div className="mx-auto max-w-screen-xl px-6 pt-36 pb-20 animate-pulse">
        <div className="h-4 w-1/4 rounded bg-neutral-100 mb-8" />
        <div className="h-12 w-3/4 rounded bg-neutral-100 mb-6" />
        <div className="h-4 w-1/3 rounded bg-neutral-100 mb-10" />
        <div className="h-[320px] w-full rounded-2xl bg-neutral-100 md:h-[460px]" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto max-w-screen-xl px-6 pt-36 pb-20 animate-pulse">
        <div className="h-4 w-1/4 bg-sand mb-8" />
        <div className="h-12 w-3/4 bg-sand mb-6" />
        <div className="h-4 w-1/3 bg-sand mb-10" />
        <div className="h-[320px] w-full bg-sand md:h-[460px]" />
      </div>
    </div>
  );
}

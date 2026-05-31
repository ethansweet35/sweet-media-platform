import Image from "next/image";
import Link from "next/link";
import MarketingPageHero, { MarketingCtaLink } from "@/components/marketing/MarketingPageHero";
import { videoStories } from "@/mocks/testimonials";

export default function StoriesPage() {
  return (
    <main className="bg-soft-white">
      <MarketingPageHero
        eyebrow="Real Families · Real Hope"
        title="Stories"
        body="Perspectives from people just like you, going through similar situations. The Family Recovery Foundation is here for you — offering first-hand perspective from real life, with real people and real answers."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <MarketingCtaLink href="/about/testimonials" label="Written testimonials" />
          <MarketingCtaLink href="/get-help" label="Get Help" />
        </div>
      </MarketingPageHero>

      <section className="pb-16 md:pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {videoStories.map((story) => (
              <Link
                key={story.id}
                href={`/testimonials/${story.id}`}
                className="group rounded-2xl overflow-hidden bg-pure-white border border-mist/60 shadow-sm hover:border-tfrf-blue/30 hover:shadow-md transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-deep-navy/5">
                  <Image
                    src={story.thumbnail}
                    alt={story.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-pure-white/90 shadow-lg group-hover:scale-110 transition-transform">
                      <i className="ri-play-fill text-2xl text-deep-navy ml-0.5" />
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h2 className="text-[17px] font-display text-deep-navy mb-1 group-hover:text-tfrf-blue transition-colors">
                    {story.title}
                  </h2>
                  <p className="text-[13px] font-body text-slate">{story.description}</p>
                  {story.date ? (
                    <p className="text-[12px] font-body text-stone-blue mt-2">{story.date}</p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { videoStories } from "@/mocks/testimonials";

export function getTestimonialStory(slug: string) {
  return videoStories.find((s) => s.id === slug) ?? null;
}

export function getTestimonialSlugs() {
  return videoStories.map((s) => s.id);
}

interface TestimonialStoryPageProps {
  slug: string;
}

export default function TestimonialStoryPage({ slug }: TestimonialStoryPageProps) {
  const story = getTestimonialStory(slug);
  if (!story) notFound();

  const hasEmbed = story.videoUrl && !story.videoUrl.includes("placeholder");

  return (
    <main className="bg-soft-white">
      <section className="bg-pure-white pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-[14px] font-body font-medium text-tfrf-blue hover:text-deep-navy mb-8"
          >
            <i className="ri-arrow-left-line" />
            All stories
          </Link>
          <h1 className="text-[clamp(28px,3.5vw,44px)] font-display text-deep-navy leading-[1.1] mb-3">
            {story.title}
          </h1>
          <p className="text-[16px] font-body text-slate">{story.description}</p>
          {story.date ? (
            <p className="text-[13px] font-body text-stone-blue mt-2">{story.date}</p>
          ) : null}
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-16 max-w-4xl">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-deep-navy shadow-lg mb-8">
            {hasEmbed ? (
              <iframe
                src={`${story.videoUrl}?rel=0`}
                title={story.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <>
                <img
                  src={story.thumbnail}
                  alt={story.title}
                  className="w-full h-full object-cover object-top"
                />
                <a
                  href="https://www.youtube.com/@tfrfoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex flex-col items-center justify-center bg-deep-navy/40"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pure-white/95 shadow-xl">
                    <i className="ri-play-fill text-3xl text-deep-navy ml-1" />
                  </span>
                </a>
              </>
            )}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/get-help"
              className="inline-flex items-center gap-2 rounded-full bg-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-pure-white hover:bg-deep-navy transition-colors"
            >
              Get Help
              <i className="ri-arrow-right-line" />
            </Link>
            <Link
              href="/family-programming"
              className="inline-flex items-center gap-2 rounded-full border border-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-tfrf-blue hover:bg-mist transition-colors"
            >
              Family Programming
            </Link>
            <Link
              href="/about/testimonials"
              className="inline-flex items-center gap-2 rounded-full border border-mist px-6 py-3 text-[14px] font-body font-semibold text-slate hover:border-tfrf-blue hover:text-tfrf-blue transition-colors"
            >
              Written testimonials
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { marketingMetadata } from "@/lib/marketing-page";
import TestimonialStoryPage, {
  getTestimonialSlugs,
  getTestimonialStory,
} from "@/views/testimonials/TestimonialStoryPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getTestimonialSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getTestimonialStory(slug);
  if (!story) {
    return marketingMetadata(`/testimonials/${slug}`, "Story", "Family recovery story.");
  }
  return marketingMetadata(
    `/testimonials/${slug}`,
    story.title,
    story.description,
  );
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <TestimonialStoryPage slug={slug} />;
}

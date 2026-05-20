import TestimonialsHeroSection from "./components/TestimonialsHeroSection";
import WrittenTestimonialsSection from "./components/WrittenTestimonialsSection";
import VideoStoriesSection from "./components/VideoStoriesSection";

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-pure-white">
      <main>
        <TestimonialsHeroSection />
        <WrittenTestimonialsSection />
        <VideoStoriesSection />
      </main>
      </div>
  );
}
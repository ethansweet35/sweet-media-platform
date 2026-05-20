'use client';

import { useEffect } from "react";
import TestimonialsHeroSection from "./components/TestimonialsHeroSection";
import WrittenTestimonialsSection from "./components/WrittenTestimonialsSection";
import VideoStoriesSection from "./components/VideoStoriesSection";

export default function Testimonials() {
  useEffect(() => {
    document.title = "Testimonials | The Family Recovery Foundation";
  }, []);

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
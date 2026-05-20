import { useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import FamilyProgrammingHeroSection from "./components/FamilyProgrammingHeroSection";
import FamilyModulesSection from "./components/FamilyModulesSection";
import WorksheetsSection from "./components/WorksheetsSection";
import BlogsSection from "./components/BlogsSection";

export default function FamilyProgramming() {
  useEffect(() => {
    document.title = "Family Programming | The Family Recovery Foundation";
  }, []);

  return (
    <div className="min-h-screen bg-pure-white">
      <Navbar />
      <main>
        <FamilyProgrammingHeroSection />
        <FamilyModulesSection />
        <WorksheetsSection />
        <BlogsSection />
      </main>
      <Footer />
    </div>
  );
}
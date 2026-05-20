import FamilyProgrammingHeroSection from "./components/FamilyProgrammingHeroSection";
import FamilyModulesSection from "./components/FamilyModulesSection";
import WorksheetsSection from "./components/WorksheetsSection";
import BlogsSection from "./components/BlogsSection";

export default function FamilyProgramming() {
  return (
    <div className="min-h-screen bg-pure-white">
      <main>
        <FamilyProgrammingHeroSection />
        <FamilyModulesSection />
        <WorksheetsSection />
        <BlogsSection />
      </main>
      </div>
  );
}
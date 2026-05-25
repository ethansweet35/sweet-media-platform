import DailyScheduleCta from "@/components/pages/daily-schedule/DailyScheduleCta";
import DailyScheduleFaq from "@/components/pages/daily-schedule/DailyScheduleFaq";
import DailyScheduleHero from "@/components/pages/daily-schedule/DailyScheduleHero";
import DailyScheduleIntro from "@/components/pages/daily-schedule/DailyScheduleIntro";
import DailySchedulePrinciples from "@/components/pages/daily-schedule/DailySchedulePrinciples";
import DailyScheduleTimeline from "@/components/pages/daily-schedule/DailyScheduleTimeline";

export default function DailySchedulePage() {
  return (
    <main className="min-h-screen bg-[var(--sr-linen)]">
      <DailyScheduleHero />
      <DailyScheduleIntro />
      <DailyScheduleTimeline />
      <DailySchedulePrinciples />
      <DailyScheduleFaq />
      <DailyScheduleCta />
    </main>
  );
}

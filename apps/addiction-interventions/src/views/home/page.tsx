import { loadAiElementorBody } from "@/lib/aiElementorMigrated";

export default function HomePage() {
  const html = loadAiElementorBody("home/migrated-raw.html");
  return (
    <div
      className="elementor-kit-8 w-full overflow-x-hidden"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

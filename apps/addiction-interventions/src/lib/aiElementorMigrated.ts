import fs from "fs";
import path from "path";

export function loadAiElementorBody(relPath: string): string {
  const filePath = path.join(process.cwd(), "src/views", relPath);
  return fs.readFileSync(filePath, "utf-8");
}

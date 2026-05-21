const MAX_BYTES = 512_000;

export async function readInstructionTextFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  const isTxt = name.endsWith(".txt") || file.type === "text/plain" || file.type === "";
  if (!isTxt) {
    throw new Error("Only .txt files are supported.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("File is too large (max 512 KB).");
  }
  const text = await file.text();
  if (!text.trim()) {
    throw new Error("The file is empty.");
  }
  return text.trim();
}

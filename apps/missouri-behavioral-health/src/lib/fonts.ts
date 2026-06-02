import { Open_Sans, Poppins } from "next/font/google";

export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "optional",
  preload: false,
  adjustFontFallback: true,
});

export const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "optional",
  preload: false,
  adjustFontFallback: true,
});

export const marketingFontClassName = `${poppins.variable} ${openSans.variable} font-body`;

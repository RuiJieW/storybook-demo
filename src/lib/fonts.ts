import { Atkinson_Hyperlegible, Geist_Mono, SUSE } from "next/font/google";

export const fontSans = Atkinson_Hyperlegible({
  subsets: ["latin"],
  variable: "--font-atkinson",
  weight: ["400", "700"],
});

export const fontHeading = SUSE({
  subsets: ["latin"],
  variable: "--font-suse",
  weight: ["400", "500", "600", "700"],
});

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const fontVariables = [
  fontSans.variable,
  fontHeading.variable,
  fontMono.variable,
] as const;

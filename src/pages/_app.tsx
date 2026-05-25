import "@/styles/globals.css";
import { Inter, Geist_Mono } from "next/font/google";
import type { AppProps } from "next/app";
import { AppProviders } from "@/components/app-providers";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <div
        className={cn(
          inter.variable,
          inter.className,
          geistMono.variable,
          "min-h-screen bg-background font-sans text-foreground antialiased",
        )}
      >
        <Component {...pageProps} />
      </div>
    </AppProviders>
  );
}

import "@/styles/globals.css";
import { Inter, Geist_Mono } from "next/font/google";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

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
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      themes={["light", "dark", "wireframe"]}
      enableSystem={false}
    >
      <TooltipProvider>
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
      </TooltipProvider>
    </ThemeProvider>
  );
}

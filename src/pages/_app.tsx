import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppProviders } from "@/components/app-providers";
import { fontSans, fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProviders>
      <div
        className={cn(
          ...fontVariables,
          fontSans.className,
          "min-h-screen bg-background font-sans text-foreground antialiased",
        )}
      >
        <Component {...pageProps} />
      </div>
    </AppProviders>
  );
}

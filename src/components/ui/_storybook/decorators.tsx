import type { Decorator } from "@storybook/nextjs-vite"
import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"

export const withAppProviders: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string) ?? "light"

  return (
    <ThemeProvider
      attribute="class"
      forcedTheme={theme}
      themes={["light", "dark", "wireframe"]}
      enableSystem={false}
    >
      <TooltipProvider>
        <div className="font-sans antialiased">
          <Story />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  )
}

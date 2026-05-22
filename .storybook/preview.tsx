import type { Preview } from "@storybook/nextjs-vite"
import { Inter, Geist_Mono } from "next/font/google"
import { cn } from "@/lib/utils"
import { withAppProviders } from "@/components/ui/_storybook/decorators"
import "@/styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        className={cn(
          inter.variable,
          inter.className,
          geistMono.variable,
          "min-h-[200px] bg-background p-6 text-foreground",
        )}
      >
        <Story />
      </div>
    ),
    withAppProviders,
  ],
  globalTypes: {
    theme: {
      description: "Design theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
          { value: "wireframe", title: "Wireframe", icon: "grid" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    options: {
      storySort: {
        order: ["Docs", ["Introduction", "Design System"], "UI", ["*"]],
      },
    },
  },
}

export default preview

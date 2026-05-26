import type { Preview } from "@storybook/nextjs-vite"
import { cn } from "@/lib/utils"
import { fontSans, fontVariables } from "@/lib/fonts"
import { withAppProviders } from "@/components/ui/_storybook/decorators"
import "@/styles/globals.css"

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        className={cn(
          ...fontVariables,
          fontSans.className,
          "min-h-50 bg-background p-6 text-foreground",
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

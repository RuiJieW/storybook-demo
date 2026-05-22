import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ScrollArea } from "./scroll-area"
import { Separator } from "./separator"

const meta = {
  title: "UI/Scroll Area",
  component: ScrollArea,
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-48 rounded-md border">
      <div className="p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i}>
            <div className="py-2 text-sm">Item {i + 1}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

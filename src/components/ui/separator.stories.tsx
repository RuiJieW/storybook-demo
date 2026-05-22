import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Separator } from "./separator"

const meta = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="w-[280px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Section</h4>
        <p className="text-sm text-muted-foreground">Description text.</p>
      </div>
      <Separator className="my-4" />
      <div className="text-sm">Content below separator.</div>
    </div>
  ),
}

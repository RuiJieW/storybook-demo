import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "./button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card"

const meta = {
  title: "UI/Hover Card",
  component: HoverCard,
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link" />}>@nextjs</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <p className="text-sm">The React Framework for the Web.</p>
      </HoverCardContent>
    </HoverCard>
  ),
}

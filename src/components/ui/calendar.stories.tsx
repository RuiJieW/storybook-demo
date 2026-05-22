import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Calendar } from "./calendar"

const meta = {
  title: "UI/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Calendar mode="single" className="rounded-lg border" />,
}

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Progress, ProgressLabel, ProgressValue } from "./progress"

const meta = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Progress value={45} className="w-[280px]">
      <ProgressLabel>Uploading</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
}

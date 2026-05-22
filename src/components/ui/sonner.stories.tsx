import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { toast } from "sonner"
import { Button } from "./button"
import { Toaster } from "./sonner"

const meta = {
  title: "UI/Sonner",
  component: Toaster,
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <Button
        variant="outline"
        onClick={() => toast("Event has been created", { description: "Monday at 3:00 PM" })}
      >
        Show toast
      </Button>
      <Toaster />
    </>
  ),
}

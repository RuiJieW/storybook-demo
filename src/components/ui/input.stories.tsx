import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Input } from "./input"

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { placeholder: "Email", type: "email", className: "w-[280px]" },
}

export const Disabled: Story = {
  args: { placeholder: "Disabled", disabled: true, className: "w-[280px]" },
}

export const Invalid: Story = {
  args: { placeholder: "Invalid", "aria-invalid": true, className: "w-[280px]" },
}

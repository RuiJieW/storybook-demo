import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./field"
import { Input } from "./input"

const meta = {
  title: "UI/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <FieldGroup className="w-[320px]">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="you@example.com" />
        <FieldDescription>We will never share your email.</FieldDescription>
      </Field>
    </FieldGroup>
  ),
}

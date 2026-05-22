import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "./button"
import { ButtonGroup } from "./button-group"

const meta = {
  title: "UI/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Center</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
}

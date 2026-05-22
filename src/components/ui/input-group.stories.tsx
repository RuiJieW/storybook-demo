import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SearchIcon } from "lucide-react"
import { Button } from "./button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "./input-group"

const meta = {
  title: "UI/Input Group",
  component: InputGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <InputGroup className="w-[320px]">
      <InputGroupAddon>
        <InputGroupText>
          <SearchIcon className="size-4" />
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton render={<Button size="sm" />}>Go</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

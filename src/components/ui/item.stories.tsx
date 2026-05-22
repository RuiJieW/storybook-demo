import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FileIcon } from "lucide-react"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "./item"

const meta = {
  title: "UI/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ItemGroup className="w-[360px]">
      <Item>
        <ItemMedia variant="icon">
          <FileIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Document.pdf</ItemTitle>
          <ItemDescription>Updated 2 hours ago</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
}

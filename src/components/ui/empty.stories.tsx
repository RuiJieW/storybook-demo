import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { InboxIcon } from "lucide-react"
import { Button } from "./button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./empty"

const meta = {
  title: "UI/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Empty className="w-[400px] border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>You do not have any messages yet.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Compose</Button>
      </EmptyContent>
    </Empty>
  ),
}

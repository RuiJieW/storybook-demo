import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "./button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"

const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-[320px]">
      <CollapsibleTrigger render={<Button variant="ghost" className="w-full justify-between" />}>
        Toggle
        <ChevronDownIcon className="size-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 text-sm text-muted-foreground">
        Hidden content revealed when expanded.
      </CollapsibleContent>
    </Collapsible>
  ),
}

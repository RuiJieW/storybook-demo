import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  NativeSelect,
  NativeSelectOption,
} from "./native-select"

const meta = {
  title: "UI/Native Select",
  component: NativeSelect,
  tags: ["autodocs"],
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NativeSelect className="w-[200px]">
      <NativeSelectOption value="">Select fruit</NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
    </NativeSelect>
  ),
}

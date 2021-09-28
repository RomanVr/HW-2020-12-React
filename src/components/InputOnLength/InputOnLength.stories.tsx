import React from "react";
import { Meta, Story } from "@storybook/react";

import { InputOnLength } from "./InputOnLength";

export default {
  title: "InputOnLength",
  component: InputOnLength,
} as unknown as Meta;

export const InputOnLengthStory: Story = () => <InputOnLength value={5555} />;

import React from "react";

import { InputSize, InputSizeProps } from "./InputSize";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Form/InputSize",
  component: InputSize,
} as Meta;

const Template: Story<InputSizeProps> = (args) => <InputSize {...args} />;

export const InputSizeStory = Template.bind({});
InputSizeStory.args = { size: "5" };

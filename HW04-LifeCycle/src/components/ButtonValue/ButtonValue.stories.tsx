import React from "react";

import { ButtonValue, ButtonValueProps } from "./ButtonValue";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Form/ButtonValue",
  component: ButtonValue,
} as Meta;

const Template: Story<ButtonValueProps> = (args) => <ButtonValue {...args} />;

export const ButtonStory = Template.bind({});

ButtonStory.args = {
  value: "Show Time",
};

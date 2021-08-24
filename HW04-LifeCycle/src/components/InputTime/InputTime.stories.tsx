import React from "react";
import { Meta, Story } from "@storybook/react";

import { InputTime } from "./InputTime";

export default {
  title: "Form/InputTime",
  component: InputTime,
} as unknown as Meta;

const Template: Story = () => <InputTime />;

export const InputTimeStory = Template.bind({});

import React from "react";
import { Meta, Story } from "@storybook/react";

import { InputTime } from "./InputTime";

export default {
  title: "Form/InputTime",
  component: InputTime,
} as unknown as Meta;

export const InputTimeStory: Story = () => <InputTime />;

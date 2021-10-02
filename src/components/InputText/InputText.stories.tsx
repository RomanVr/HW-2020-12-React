import React from "react";
import { Meta, Story } from "@storybook/react";

import { InputText } from "./InputText";

export default {
  title: "Form/InputText",
  component: InputText,
} as Meta;

export const InputTextStory: Story = () => <InputText />;

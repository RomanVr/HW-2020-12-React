import React from "react";
import { Meta, Story } from "@storybook/react";

import { InputText, InputTextProps } from "./InputText";

export default {
  title: "Form/InputText",
  component: InputText,
  argsTypes: {
    onClickInput: { actions: "Click" },
    onChangeInput: { actions: "Change" },
  },
} as Meta;

export const InputDefaultStory: Story<InputTextProps> = (args) => (
  <InputText {...args} />
);
InputDefaultStory.args = {
  valueInput: "value",
  type: "text",
  labelInput: "Label:",
};

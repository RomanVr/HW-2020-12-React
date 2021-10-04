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

const Template: Story<InputTextProps> = (args) => <InputText {...args} />;

export const InputDefaultStory = Template.bind({});
InputDefaultStory.args = {
  valueInput: "value",
  type: "text",
  labelInput: "Label:",
};

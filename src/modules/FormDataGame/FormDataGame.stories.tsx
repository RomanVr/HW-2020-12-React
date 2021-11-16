import { Meta, Story } from "@storybook/react";
import React from "react";

import { FormDataGame, FormDataGameProps } from "./FormDataGame";

export default {
  title: "Form/Form",
  component: FormDataGame,
  argsTypes: {
    onClickInput: { actions: "Click" },
  },
} as Meta;

export const FormDataGameStory: Story<FormDataGameProps> = (args) => (
  <FormDataGame {...args} />
);

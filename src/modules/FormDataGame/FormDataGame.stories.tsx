import { Meta, Story } from "@storybook/react";
import React from "react";

import { FormDataGame, FormDataGameProps } from "./FormDataGame";

export default {
  title: "Form/Form",
  component: FormDataGame,
} as Meta;

const Template: Story<FormDataGameProps> = (args) => <FormDataGame {...args} />;

export const FormStory = Template.bind({});
FormStory.args = { errorInfoElem: <></> };

export const FormStoryError = Template.bind({});
FormStoryError.args = {
  errorInfoElem: <span style={{ color: "red" }}>Please enter Number</span>,
};

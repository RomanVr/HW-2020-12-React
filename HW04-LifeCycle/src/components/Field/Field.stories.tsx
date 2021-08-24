import React from "react";
import { Meta, Story } from "@storybook/react";

import { Field, FieldProps } from "./Field";

export default {
  title: "Field/Field",
  component: Field,
} as Meta;

const Template: Story<FieldProps> = (args) => <Field {...args} />;

export const FieldStory = Template.bind({});
FieldStory.args = { start: 5 };

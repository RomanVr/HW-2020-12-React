import React from "react";
import { Meta, Story } from "@storybook/react";

import { Field, FieldProps } from "./Field";

export default {
  title: "Field/Field",
  component: Field,
} as Meta;

const fieldTest = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const Template: Story<FieldProps> = (args) => <Field {...args} />;

export const FieldStory = Template.bind({});
FieldStory.args = { fieldData: fieldTest };

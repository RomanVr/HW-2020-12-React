import React from "react";

import { Story, Meta } from "@storybook/react";
import { Cell, CellProps } from "./Cell";

export default {
  title: "Field/Cell",
  component: Cell,
  argTypes: {
    dataKey: { defaultValue: 1 },
  },
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const CellDataKey = Template.bind({});
CellDataKey.args = { dataKey: 10 };

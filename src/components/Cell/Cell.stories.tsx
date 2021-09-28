import React from "react";

import { Story, Meta } from "@storybook/react";
import { Cell, CellProps } from "./Cell";

export default {
  title: "Field/Cell",
  component: Cell,
} as Meta;

const Template: Story<CellProps> = (args) => <Cell {...args} />;

export const CellLife = Template.bind({});
CellLife.args = { coordX: 10, coordY: 10, isLive: true };

export const CellDead = Template.bind({});
CellDead.args = { coordX: 10, coordY: 10, isLive: false };

import React from "react";

import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";

import { Cell } from "./Cell";

export default {
  title: "Cell",
  Component: Cell,
  decorators: [withKnobs],
};

export const CellStory: React.FC = () => {
  const dataKey = number("data-key", 10);
  return <Cell dataKey={dataKey} handleClick={action("log data-key")} />;
};

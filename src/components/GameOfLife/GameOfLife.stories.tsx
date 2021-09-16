import React from "react";
import { Meta, Story } from "@storybook/react";

import { GameOfLife } from "./GameOfLife";

export default {
  title: "GameOfLife",
  component: GameOfLife,
} as unknown as Meta;

export const GameOfLifeStory: Story = () => <GameOfLife />;

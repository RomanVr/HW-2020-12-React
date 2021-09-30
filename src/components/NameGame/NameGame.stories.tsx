import { Meta, Story } from "@storybook/react";
import React from "react";
import { NameGame } from "./NameGame";

export default {
  title: "Name Game",
  component: NameGame,
} as Meta;

export const NameGameStory: Story = () => <NameGame />;

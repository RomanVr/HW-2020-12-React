import React from "react";
import { Meta, Story } from "@storybook/react";

import { AppGameOfLife } from "./AppGameOfLife";

export default {
  title: "App",
  component: AppGameOfLife,
} as unknown as Meta;

export const AppStory: Story = () => <AppGameOfLife />;

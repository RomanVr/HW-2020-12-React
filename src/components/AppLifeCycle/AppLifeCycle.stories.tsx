import React from "react";
import { Meta, Story } from "@storybook/react";

import { AppLifeCycle } from "./AppLifeCycle";

export default {
  title: "App",
  component: AppLifeCycle,
} as unknown as Meta;

export const AppStory: Story = () => <AppLifeCycle />;

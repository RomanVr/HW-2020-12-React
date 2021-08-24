import React from "react";
import { Meta, Story } from "@storybook/react";

import { AppLifeCycle } from "./AppLifeCycle";

export default {
  title: "App",
  component: AppLifeCycle,
} as unknown as Meta;

const Template: Story = () => <AppLifeCycle />;

export const AppStory = Template.bind({});

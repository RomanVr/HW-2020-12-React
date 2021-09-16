import React from "react";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { User } from "./User";

export default {
  title: "User",
  component: User,
  argsTypes: { logoutClick: { action: "Click" } },
} as unknown as Meta;

export const UserStory: Story = () => (
  <User nameUser="User" logoutClick={action("Button is clicked!")} />
);

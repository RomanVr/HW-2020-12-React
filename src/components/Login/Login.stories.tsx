import React from "react";
import { Meta, Story } from "@storybook/react";

import { Login } from "./Login";

export default {
  title: "Login",
  component: Login,
} as unknown as Meta;

export const LoginStory: Story = () => (
  <Login onLogin={(name: string) => name} />
);

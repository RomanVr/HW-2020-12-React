import React from "react";
import { Meta, Story } from "@storybook/react";

import { InputLogin } from "./InputLogin";

export default {
  title: "Login",
  component: InputLogin,
} as Meta;

export const LoginStory: Story = () => (
  <InputLogin nameUser="Name User" setNameUser={(name: string) => name} />
);

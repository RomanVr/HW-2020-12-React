import React from "react";
import { Meta, Story } from "@storybook/react";

import { ButtonSubmit } from "./ButtonSubmit";

export default {
  title: "ButtonSubmit",
  component: ButtonSubmit,
} as unknown as Meta;

export const ButtonSubmitStory: Story = () => <ButtonSubmit />;

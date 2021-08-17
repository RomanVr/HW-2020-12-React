import React from "react";
import { action } from "@storybook/addon-actions";
import { ButtonValue } from "./ButtonValue";
import { text, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "ButtonValue",
  Component: ButtonValue,
  decorators: [withKnobs],
};

export const ButtonStory: React.FC = () => {
  return (
    <ButtonValue
      value={text("filled with", "Show Time")}
      handleClick={action("Click")}
    />
  );
};

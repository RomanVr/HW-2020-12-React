import React from "react";
import { action } from "@storybook/addon-actions";
import { text, withKnobs } from "@storybook/addon-knobs";
import { InputSize } from "..";

export default {
  title: "InputSize",
  Component: InputSize,
  decorators: [withKnobs],
};

export const InputSizeStory: React.FC = () => {
  return (
    <InputSize
      size={text("filled with", "size")}
      handleChangeSize={action("ChangeSize")}
    />
  );
};

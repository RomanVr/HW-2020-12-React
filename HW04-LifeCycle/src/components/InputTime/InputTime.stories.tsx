import React from "react";
import { text, withKnobs } from "@storybook/addon-knobs";
import { InputTime } from "..";

export default {
  title: "InputTime",
  Component: InputTime,
  decorators: [withKnobs],
};

export const InputTimeStory: React.FC = () => {
  return <InputTime timeValue={text("filled with", "12:05:55")} />;
};

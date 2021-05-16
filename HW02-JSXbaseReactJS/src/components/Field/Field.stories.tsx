import React from "react";

//import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";

import { Field } from "./Field";

export default {
  title: "Field",
  decorators: [withKnobs],
};

export const StoryField = (): React.ReactElement => {
  const size = number("size field", 3);
  return <Field start={size} />;
};

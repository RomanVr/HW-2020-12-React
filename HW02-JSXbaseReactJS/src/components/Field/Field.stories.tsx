import React from "react";

//import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";

import { Field } from "./Field";

export default {
  title: "Field",
  decorators: [withKnobs],
};

export const storyField = (): React.ReactElement => <Field start={3} />;

import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { FormDataGame } from "./FormDataGame";

export default {
  title: "FormData",
  Component: FormDataGame,
  decorators: [withKnobs],
};

export const FormWithoutError: React.FC = () => {
  return <FormDataGame errorInfoElem={<></>} onSubmit={action("Submit")} />;
};

export const FormWithError: React.FC = () => {
  return (
    <FormDataGame
      errorInfoElem={<span style={{ color: "red" }}>Please enter Number</span>}
      onSubmit={action("Submit")}
    />
  );
};

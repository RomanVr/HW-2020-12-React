import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

import AppLifeCycle from "./AppLifeCycle";

export default {
  title: "App",
  Component: AppLifeCycle,
  decorators: [withKnobs],
};

export const App: React.FC = () => {
  return <AppLifeCycle />;
};

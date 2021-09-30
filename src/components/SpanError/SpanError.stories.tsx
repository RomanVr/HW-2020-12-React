import React from "react";
import { Meta, Story } from "@storybook/react";
import { SpanError } from "./SpanError";

export default {
  title: "Span Error",
  component: SpanError,
} as Meta;

export const SpanErrorStory: Story = () => <SpanError />;

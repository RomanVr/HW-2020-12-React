import React from "react";
import { InputText } from "@/components";
import { render, screen } from "@testing-library/react";
import { withInput } from "./withInput";

describe("Test WithInputHOC", () => {
  it("render WithInput", () => {
    const params = {
      nameInput: "name",
    };
    const WrappedComponent = withInput(InputText, params);
    render(<WrappedComponent />);

    expect(screen.getByTestId("InputTextname")).toBeInTheDocument();
    expect(WrappedComponent.displayName).toBe("InputTextwithInput");
  });
});

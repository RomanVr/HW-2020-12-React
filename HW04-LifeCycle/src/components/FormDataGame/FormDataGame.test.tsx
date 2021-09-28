import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { FormDataGame } from "./FormDataGame";

describe("FormDataGame testing", () => {
  beforeEach(() => {
    render(<FormDataGame onSubmit={jest.fn()} errorInfoElem={<></>} />);
  });

  it("renders FormDataGame", () => {
    expect(screen.getByPlaceholderText("Enter size")).toBeInTheDocument();
    expect(screen.queryByTestId("inputTime")).toBeNull();
    expect(screen.getByTestId("buttonValue")).toBeInTheDocument();
  });

  it("add inputTime on click button", () => {
    expect(screen.queryByTestId("inputTime")).toBeNull();
    expect(screen.getByTestId("buttonValue")).toBeInTheDocument();

    userEvent.click(screen.getByTestId("buttonValue"));
    expect(screen.getByTestId("inputTime")).toBeInTheDocument();

    userEvent.click(screen.getByTestId("buttonValue"));
    expect(screen.queryByTestId("inputTime")).toBeNull();
  });
});

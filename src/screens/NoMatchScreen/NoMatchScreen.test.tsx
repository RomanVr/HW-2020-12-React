import { render } from "@testing-library/react";
import React from "react";
import { NoMatchScreen } from "./NoMatchScreen";

describe("Test NoMatchScreen", () => {
  it("render NoMatchScreen", () => {
    const { container } = render(<NoMatchScreen />);
    expect(container).toMatchInlineSnapshot(`
    <div>
      <h1>
        404
      </h1>
    </div>
    `);
  });
});

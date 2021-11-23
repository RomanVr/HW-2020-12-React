import { render } from "@testing-library/react";
import React from "react";
import { withTextDecor } from "./withTextDecor";

describe("Test WithDecorHOC", () => {
  const stylesParams = {
    style: { background: "red" },
  };
  const Component: React.FC = (props) => (
    <div {...props}>
      <h1>Decor</h1>
    </div>
  );
  it("render WithDecor", () => {
    Component.displayName = "DecoredComponent";
    const WithDecor = withTextDecor(Component, stylesParams);
    const { container } = render(<WithDecor />);
    expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        style="background: red;"
      >
        <h1>
          Decor
        </h1>
      </div>
    </div>
    `);
    expect(WithDecor.displayName).toBe("DecoredComponentwithTextDecor");
  });
  it("render WithDecor default display name", () => {
    Component.displayName = undefined;
    const WithDecor = withTextDecor(Component, stylesParams);
    render(<WithDecor />);
    expect(WithDecor.displayName).toBe("ComponentwithTextDecor");
  });
});

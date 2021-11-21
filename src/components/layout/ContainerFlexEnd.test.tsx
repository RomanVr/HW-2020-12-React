import React from "react";
import { render } from "@testing-library/react";
import { ContainerFlexEnd } from "./ContainerFlexEnd";

describe("Test ContainerFlexEnd", () => {
  it("render ContainerFlexEnd", () => {
    const Component: React.FC = () => <div>test</div>;
    const { container } = render(
      <ContainerFlexEnd>
        <Component />
      </ContainerFlexEnd>
    );
    expect(container).toMatchInlineSnapshot(`
    .emotion-0 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-box-pack: end;
      -ms-flex-pack: end;
      -webkit-justify-content: flex-end;
      justify-content: flex-end;
    }

    <div>
      <div
        class="emotion-0"
      >
        <div>
          test
        </div>
      </div>
    </div>
    `);
  });
});

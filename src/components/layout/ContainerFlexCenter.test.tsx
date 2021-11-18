import React from "react";
import { render } from "@testing-library/react";
import { ContainerFlexCenter } from "./ContainerFlexCenter";

describe("Test ContainerFlexCenter", () => {
  it("render ContainerFlexCenter", () => {
    const Component: React.FC = () => <div>test</div>;
    const { container } = render(
      <ContainerFlexCenter>
        <Component />
      </ContainerFlexCenter>
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
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
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

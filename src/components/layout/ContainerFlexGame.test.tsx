import React from "react";
import { render } from "@testing-library/react";
import { ContainerFlexGame } from "./ContainerFlexGame";

describe("Test ContainerFlexGame", () => {
  it("render ContainerFlexGame", () => {
    const Component: React.FC = () => <div>test</div>;
    const { container } = render(
      <ContainerFlexGame>
        <Component />
      </ContainerFlexGame>
    );
    expect(container).toMatchInlineSnapshot(`
    .emotion-0 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-flex-wrap: wrap;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      min-width: -webkit-fit-content;
      min-width: -moz-fit-content;
      min-width: fit-content;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      border: 1px solid black;
      background: #00d8fb26;
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

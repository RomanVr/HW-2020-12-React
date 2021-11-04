import React, { useState } from "react";
import { InputMultiInForm } from "./InputMultiInForm";
import { InputText, SpanError } from "@/components";
import { withInput } from "@/HOC/withInput";

const params = {
  type: "submit",
  valueInput: "Ok",
  nameInput: "ButtonSubmit",
  maxLengthInput: 40,
};

const ButtonSubmitWithInputText = withInput(InputText, params);

export interface FormDataGameProps {
  getSizeXY: (sizeX: number, sizeY: number) => void;
}

const EmptyElement: React.FC = () => <></>;

export const FormDataGame: React.FC<FormDataGameProps> = ({
  getSizeXY,
}): React.ReactElement => {
  const [sizeX, setSizeX] = useState("15");
  const [sizeY, setSizeY] = useState("20");
  const [errorInfoElem, setErrorInfoElem] = useState(<EmptyElement />);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    if (isNaN(Number(sizeX)) || isNaN(Number(sizeY))) {
      setErrorInfoElem(<SpanError />);
      return;
    }
    setErrorInfoElem(<EmptyElement />);
    getSizeXY(Number(sizeX), Number(sizeY));
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ display: "flex" }}>
        {[
          {
            sizeState: sizeX,
            onChange: setSizeX,
            placeHolder: "Значение по горизонтали",
            label: "X: ",
            nameState: "sizeX",
          },
          {
            sizeState: sizeY,
            onChange: setSizeY,
            placeHolder: "Значение по вертикали",
            label: "Y: ",
            nameState: "sizeY",
          },
        ].map((propsItem) => (
          <InputMultiInForm
            key={propsItem.label}
            sizeState={propsItem.sizeState}
            onChange={propsItem.onChange}
            placeHolder={propsItem.placeHolder}
            label={propsItem.label}
            nameState={propsItem.nameState}
          />
        ))}
        <ButtonSubmitWithInputText />
        {errorInfoElem}
      </form>
    </>
  );
};

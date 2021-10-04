import React, { FormEvent } from "react";
import { InputMultiInForm } from "./InputMultiInForm";
import { InputText } from "@/components";
import { withInput } from "@/HOC/withInput";

const params = {
  type: "submit",
  valueInput: "Ok",
  nameInput: "ButtonSubmit",
  maxLengthInput: 40,
};

const ButtonSubmitWithInputText = withInput(InputText, params);

export interface FormDataGameState {
  sizeX: string;
  sizeY: string;
}

export interface FormDataGameProps {
  onSubmit: (sizeX: number, sizeY: number) => void;
  errorInfoElem: React.ReactElement;
}

export class FormDataGame extends React.Component<
  FormDataGameProps,
  FormDataGameState
> {
  constructor(props: FormDataGameProps) {
    super(props);
    this.state = {
      sizeX: "10",
      sizeY: "10",
    };

    this.getHandleFormChange = this.getHandleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    const sizeX = Number(this.state.sizeX);
    const sizeY = Number(this.state.sizeY);
    this.props.onSubmit(sizeX, sizeY);
  }

  getHandleFormChange = (
    valueInput: string,
    ev: FormEvent<HTMLInputElement> | undefined
  ): void => {
    const elemForm = ev?.target as HTMLInputElement;
    this.setState({
      [elemForm.getAttribute("name") as keyof FormDataGameState]: valueInput,
    } as any);
  };

  render(): React.ReactElement {
    if (isNaN(Number(this.state.sizeX)) || isNaN(Number(this.state.sizeY))) {
      throw new Error("Size must be a number!");
    }
    return (
      <>
        <form onSubmit={this.handleSubmit} style={{ display: "flex" }}>
          {[
            {
              sizeState: this.state.sizeX,
              onChange: this.getHandleFormChange,
              placeHolder: "Значение по горизонтали",
              label: "X: ",
              nameState: "sizeX",
            },
            {
              sizeState: this.state.sizeY,
              onChange: this.getHandleFormChange,
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
          {this.props.errorInfoElem}
        </form>
      </>
    );
  }
}

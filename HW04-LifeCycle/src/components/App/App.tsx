import React from "react";

import FormDataGame from "../FormDataGame/FormDataGame";
import { Field } from "../";

interface AppState {
  sizeField: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProp {}

export default class App extends React.Component<AppProp, AppState> {
  constructor(props: AppProp | Readonly<AppProp>) {
    super(props);
    this.state = { sizeField: 10 };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(sizeField: number): void {
    console.log("sizeField - :", sizeField);
    this.setState({ sizeField });
  }

  render(): React.ReactElement {
    return (
      <>
        <FormDataGame onSubmit={this.onSubmit} />
        <Field start={this.state.sizeField} />
      </>
    );
  }
}

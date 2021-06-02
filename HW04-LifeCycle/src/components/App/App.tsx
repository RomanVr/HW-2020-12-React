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

  shouldComponentUpdate(nextProps: never, nextState: AppState): boolean {
    //контролируем в стейте size
    const isUpdate: boolean = this.state.sizeField !== nextState.sizeField;
    if (isUpdate) {
      console.log("App shouldUpdate!");
    } else {
      console.log("App Not shouldUpdate!");
    }
    return isUpdate;
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

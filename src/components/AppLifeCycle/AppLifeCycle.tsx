import React, { ErrorInfo } from "react";

import { FormDataGame } from "../";
import { Field } from "../";

interface AppState {
  sizeX: number;
  sizeY: number;

  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class AppLifeCycle extends React.Component<unknown, AppState> {
  IMAGE_ID_DEFAULT?: number;
  INTERVAL_TIME?: number;

  constructor(props: never) {
    super(props);
    this.state = {
      sizeX: 20,
      sizeY: 30,

      error: null,
      errorInfo: null,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(sizeX: number, sizeY: number): void {
    this.setState({ sizeX, sizeY });
    if (this.state.errorInfo) {
      this.setState({ errorInfo: null });
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  shouldComponentUpdate(nextProps: never, nextState: AppState): boolean {
    //контролируем в стейте size
    const isUpdate: boolean =
      this.state.sizeX !== nextState.sizeX ||
      this.state.sizeY !== nextState.sizeY ||
      this.state.errorInfo !== nextState.errorInfo;
    return isUpdate;
  }

  render(): React.ReactElement {
    const { sizeX, sizeY } = this.state;
    let errorInfoElem: React.ReactElement = <></>;
    if (this.state.errorInfo) {
      errorInfoElem = (
        <span data-testid="spanError" style={{ color: "red" }}>
          Please enter Number
        </span>
      );
    }
    return (
      <>
        <FormDataGame onSubmit={this.onSubmit} errorInfoElem={errorInfoElem} />
        <Field sizeX={sizeX} sizeY={sizeY} />
      </>
    );
  }
}

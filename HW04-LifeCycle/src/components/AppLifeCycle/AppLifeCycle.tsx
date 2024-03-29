import React, { ErrorInfo } from "react";

import { FormDataGame } from "../";
import { Field } from "../";
import { getUrl } from "../../utils";

interface AppState {
  sizeField: number;
  url: string;

  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class AppLifeCycle extends React.Component<unknown, AppState> {
  _isMounted: boolean;
  IMAGE_ID_DEFAULT?: number;
  INTERVAL_TIME?: number;
  imageNumber: number;

  constructor(props: never) {
    super(props);

    this.state = {
      sizeField: 10,
      url: "",
      error: null,
      errorInfo: null,
    };
    this.imageNumber = 0,
    this._isMounted = false;
    this.IMAGE_ID_DEFAULT = 200;
    this.INTERVAL_TIME = 1000;
    this.setNewImage = this.setNewImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(sizeField: number): void {
    this.setState({ sizeField });
    if (this.state.errorInfo) {
      this.setState({ errorInfo: null });
    }
  }

  setNewImage(): void {
    if (this._isMounted) {
      const newId = Math.floor(
        Math.random() * (this.IMAGE_ID_DEFAULT as number)
        );
      imageNumber: this.imageNumber + 1,
      this.setState((state: AppState) => ({
        url: getUrl(newId),
      }));
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  componentDidMount(): void {
    this._isMounted = true;
    this.setNewImage();
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  componentDidUpdate(): void {
    if (this._isMounted) {
      this.setNewImage();
    }
  }

  shouldComponentUpdate(nextProps: never, nextState: AppState): boolean {
    //контролируем в стейте size
    const isUpdate: boolean =
      this.state.sizeField !== nextState.sizeField ||
      this.state.errorInfo !== nextState.errorInfo;
    return isUpdate;
  }

  render(): React.ReactElement {
    const { url } = this.state;
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
        <img src={url} alt="Main" style={{ marginTop: 16 }} />
        <h4>Image Number: {this.imageNumber}</h4>
        <FormDataGame onSubmit={this.onSubmit} errorInfoElem={errorInfoElem} />
        <Field start={this.state.sizeField} />
      </>
    );
  }
}

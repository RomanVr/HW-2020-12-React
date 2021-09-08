import React, { ErrorInfo } from "react";

import { FormDataGame } from "../";
import { Field } from "../";
import { getUrl } from "../../utils";

interface AppState {
  sizeField: number;
  url: string;
  imageNumber: number;

  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const urlDefault = "https://picsum.photos/id/1/200";

export class AppLifeCycle extends React.Component<unknown, AppState> {
  IMAGE_ID_DEFAULT?: number;
  INTERVAL_TIME?: number;

  constructor(props: never) {
    super(props);
    this.state = {
      sizeField: 10,
      url: urlDefault,
      imageNumber: 0,

      error: null,
      errorInfo: null,
    };

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
    const newId = Math.floor(Math.random() * (this.IMAGE_ID_DEFAULT as number));
    this.setState((state: AppState) => ({
      url: getUrl(newId),
      imageNumber: state.imageNumber + 1,
    }));
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  componentDidMount(): void {
    this.setNewImage();
  }

  componentDidUpdate(): void {
    this.setNewImage();
  }

  shouldComponentUpdate(nextProps: never, nextState: AppState): boolean {
    //контролируем в стейте size
    const isUpdate: boolean =
      this.state.sizeField !== nextState.sizeField ||
      this.state.errorInfo !== nextState.errorInfo;
    return isUpdate;
  }

  render(): React.ReactElement {
    const { url, imageNumber } = this.state;
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
        <h4>Image Number: {imageNumber}</h4>
        <FormDataGame onSubmit={this.onSubmit} errorInfoElem={errorInfoElem} />
        <Field start={this.state.sizeField} />
      </>
    );
  }
}

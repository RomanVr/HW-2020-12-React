import React, { ErrorInfo } from "react";

import FormDataGame from "../FormDataGame/FormDataGame";
import { Field } from "../";
import { getUrl } from "../../utils";

interface AppState {
  sizeField: number;
  url: string;
  imageNumber: number;

  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppProp {}

export default class App extends React.Component<AppProp, AppState> {
  _isMounted: boolean | undefined;
  IMAGE_ID_DEFAULT?: number;
  INTERVAL_TIME?: number;

  constructor(props: AppProp | Readonly<AppProp>) {
    super(props);
    this.state = {
      sizeField: 10,
      url: "",
      imageNumber: 0,

      error: null,
      errorInfo: null,
    };

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
      this.setState((state: AppState) => ({
        url: getUrl(newId),
        imageNumber: state.imageNumber + 1,
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
    if (!this._isMounted) {
      this.setNewImage();
    }
  }

  shouldComponentUpdate(nextProps: never, nextState: AppState): boolean {
    //контролируем в стейте size
    const isUpdate: boolean =
      this.state.sizeField !== nextState.sizeField ||
      nextState.errorInfo !== null;
    return isUpdate;
  }

  render(): React.ReactElement {
    const { url, imageNumber } = this.state;
    let errorInfoElem: React.ReactElement = <></>;
    if (this.state.errorInfo) {
      errorInfoElem = <span style={{ color: "red" }}>Please enter Number</span>;
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

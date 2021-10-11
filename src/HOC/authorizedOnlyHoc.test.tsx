import React from "react";
import { cleanup } from "@testing-library/react";

jest.mock("@/api/auth", () => ({
  isLoggedIn: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  Redirect: function Redirect(props: unknown) {
    return <div data-testid="redirect">Redirect: {JSON.stringify(props)}</div>;
  },
}));

afterEach(cleanup);

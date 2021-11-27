import React from "react";
import { render, cleanup } from "@testing-library/react";
import Sell from "./";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<Sell />);
  expect(asFragment()).toMatchSnapshot();
});
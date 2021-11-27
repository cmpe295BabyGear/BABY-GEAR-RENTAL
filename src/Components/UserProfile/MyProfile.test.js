import React from "react";
import { render, cleanup } from "@testing-library/react";
import MyProfile from "./MyProfile";

import {
  BrowserRouter as Router,
} from "react-router-dom";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(<Router><MyProfile /></Router>);
  expect(asFragment()).toMatchSnapshot();
});
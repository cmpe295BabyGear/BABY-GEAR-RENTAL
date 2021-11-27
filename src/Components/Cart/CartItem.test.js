import React from "react";
import { render, cleanup } from "@testing-library/react";
import CartItem from "./CartItem";

import {
  BrowserRouter as Router,
} from "react-router-dom";

afterEach(cleanup);
const cartItem={startDate: new Date(), endDate: new Date()};
it("renders CartItem", () => {
  const { asFragment } = render(<Router><CartItem cartItem={cartItem} /></Router>);
  expect(asFragment()).toMatchSnapshot();
});
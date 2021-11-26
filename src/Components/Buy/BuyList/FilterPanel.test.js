import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import userEvent from "@testing-library/user-event";
import FilterPanel from './FilterPanel';

import {
  BrowserRouter as Router,
} from "react-router-dom";

describe("FilterPanel", () => {
  it('should render FilterPanel component', () => {
    const props = {};
    render(<Router><FilterPanel {...props} /></Router>);     
    const element = screen.getByText('Search');
    expect(element).toBeInTheDocument();
  });

  // it("Filter Panel check button clicked", () => {
  //   const props = {};
  //   const { getByText } = render(<Router><FilterPanel {...props} /></Router>)
  //   fireEvent.click(getByText('Search'));
  //   expect(screen.getByText('Category:')).toBeInTheDocument()
  // });

});
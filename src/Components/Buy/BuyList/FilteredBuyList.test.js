import React from 'react';
import { render, screen } from '@testing-library/react';
import FilteredBuyList from './FilteredBuyList';

import {
  BrowserRouter as Router,
} from "react-router-dom";

describe("FilteredBuyList", () => {
  it('should render FilteredBuyList component', () => {
     const props = {filteredBuyList: []};
    render(<Router><FilteredBuyList {...props} /></Router>);     
    const element = screen.getByTestId('FilteredBuyList');
    expect(element).toBeInTheDocument();
  });
});
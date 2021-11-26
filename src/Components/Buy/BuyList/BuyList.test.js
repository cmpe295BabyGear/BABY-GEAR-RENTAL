import React from 'react';
import { render, screen } from '@testing-library/react';
import BuyList from './';

import {
  BrowserRouter as Router,
} from "react-router-dom";

describe("BuyList", () => {
  it('should render BuyList component', () => {
     const props = {};
    render(<Router><BuyList {...props} /></Router>);     
    const element = screen.getByTestId('BuyList');
    expect(element).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import Buy from './';

import {
  BrowserRouter as Router,
} from "react-router-dom";

describe("Buy", () => {
  it('should render Buy component', () => {
     const props = {};
    render(<Router><Buy {...props} /></Router>);     
    const element = screen.getByTestId('Buy');
    expect(element).toBeInTheDocument();
  });
});
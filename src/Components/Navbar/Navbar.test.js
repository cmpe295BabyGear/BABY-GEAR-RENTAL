import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './';

import {
  BrowserRouter as Router,
} from "react-router-dom";

describe("Navbar", () => {
  it('should render Navbar component', () => {
     const props = {};
    render(<Router><Navbar {...props} /></Router>);     
    const element = screen.getByText('Preloved Baby Gear Center');
    expect(element).toBeInTheDocument();
  });
});
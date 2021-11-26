import React from 'react';
import { render, screen } from '@testing-library/react';
import Categories from './Categories';

import {
  BrowserRouter as Router,
} from "react-router-dom";

describe("Categories", () => {
  it('should render Categories component', () => {
     const props = {};
    render(<Router><Categories {...props} /></Router>);     
    const element = screen.getByText('Featured Categories');
    expect(element).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import Banner from './Banner';

import {
  BrowserRouter as Router,
} from "react-router-dom";

describe("Banner", () => {
  it('should render Banner component', () => {
     const props = {};
    render(<Router><Banner {...props} /></Router>);     
    const element = screen.getByText('Spend Less Save More!');
    expect(element).toBeInTheDocument();
  });
});
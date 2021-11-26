import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductDetails from './';

describe("ProductDetails", () => {
  it('should render ProductDetails component', () => {
     const props = {};
    render(<ProductDetails {...props} />);     
    const element = screen.getByText('Category');
    expect(element).toBeInTheDocument();
  });
});
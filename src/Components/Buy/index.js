import React from 'react';

import Banner from './Banner';
import Categories from './Categories';
import { Container } from '@material-ui/core';

export const Buy = () => {
  return (
    <Container maxWidth="lg" data-testid="Buy">
    <div className="Buy">
      <Banner />
      <Categories />
    </div>
    </Container>
  );
}

export default Buy;
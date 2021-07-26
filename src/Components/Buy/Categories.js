import React from 'react';
import Grid from '@material-ui/core/Grid';

export const Categories = () => {
  return (
      <div className="Categories">
        <h1>Featured Categories</h1>
        <div>
          <Grid container direction="row" spacing={1} alignItems="center" justifyContent="center" className="categoriesRow">
            <Grid item xs={3} alignItems="center" justifyContent="center">
              <div className="categoryImage carSeatImage">
                <img src="https://prelovedbabyitems.s3.us-east-2.amazonaws.com/categories/carseat.png"
                height="150"
                width="150"
                alt="Car Seat"/>
              </div>
              <h2>Car Seats</h2>
            </Grid>
            <Grid item xs={3}>
              <div className="categoryImage cribImage">
                <img src="https://prelovedbabyitems.s3.us-east-2.amazonaws.com/categories/crib.png"
                height="150"
                width="150"
                alt="Crib"/>
              </div>
              <h2>Cribs</h2>
            </Grid>
            <Grid item xs={3}>
              <div className="categoryImage highChairImage">
                <img src="https://prelovedbabyitems.s3.us-east-2.amazonaws.com/categories/highchair.png"
                height="150"
                width="150"
                alt="High Chair"/>
              </div>
              <h2>High Chairs</h2>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={1} alignItems="center" justifyContent="center" className="categoriesRow">
            <Grid item xs={3}>
              <div className="categoryImage bathImage">
                <img src="https://prelovedbabyitems.s3.us-east-2.amazonaws.com/categories/bath.png"
                height="150"
                width="150"
                alt="Bath"/>
              </div>
              <h2>Bath</h2>
            </Grid>
            <Grid item xs={3}>
              <div className="categoryImage safetyImage">
                <img src="https://prelovedbabyitems.s3.us-east-2.amazonaws.com/categories/safety.png"
                height="150"
                width="150"
                alt="Safety"/>
              </div>
              <h2>Safety</h2>
            </Grid>
            <Grid item xs={3}>
              <div className="categoryImage strollerImage">
                <img src="https://prelovedbabyitems.s3.us-east-2.amazonaws.com/categories/stroller.png"
                height="150"
                width="150"
                alt="Strollers"/>
              </div>
              <h2>Strollers</h2>
            </Grid>
          </Grid>
      </div>
    </div>
  );
}

export default Categories;
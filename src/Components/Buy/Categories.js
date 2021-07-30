import React from 'react';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

export const Categories = () => {
  return (
      <div className="Categories">
        <h1>Featured Categories</h1>
        <div>
          <Grid container direction="row" spacing={1} alignItems="center" justifyContent="center" className="categoriesRow">
            <Grid item xs={3} alignItems="center" justifyContent="center">
              <Link to="/buyList/CarSeat">
                <div className="categoryImage carSeatImage">
                  <img src="https://prelovedbabyitems.s3.us-east-2.amazonaws.com/categories/carseat.png"
                  height="150"
                  width="150"
                  alt="Car Seat"/>
                </div>
              </Link>
              <h2>Car Seats</h2>
            </Grid>
            <Grid item xs={3}>
              <Link to="/buyList/crib">
                <div className="categoryImage cribImage">
                  <img src="https://prelovedbabyitems.s3.us-east-2.amazonaws.com/categories/crib.png"
                  height="150"
                  width="150"
                  alt="Crib"/>
                </div>
              </Link>
              <h2>Cribs</h2>
            </Grid>
            <Grid item xs={3}>
              <Link to="/buyList/highchair">
                <div className="categoryImage highChairImage">
                  <img src="https://prelovedbabyitems.s3.us-east-2.amazonaws.com/categories/highchair.png"
                  height="150"
                  width="150"
                  alt="High Chair"/>
                </div>
              </Link>
              <h2>High Chairs</h2>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={1} alignItems="center" justifyContent="center" className="categoriesRow">
            <Grid item xs={3}>
              <Link to="/buyList/bath">
                <div className="categoryImage bathImage">
                  <img src="https://prelovedbabyitems.s3.us-east-2.amazonaws.com/categories/bath.png"
                  height="150"
                  width="150"
                  alt="Bath"/>
                </div>
              </Link>
              <h2>Bath</h2>
            </Grid>
            <Grid item xs={3}>
              <Link to="/buyList/safety">
                <div className="categoryImage safetyImage">
                  <img src="https://prelovedbabyitems.s3.us-east-2.amazonaws.com/categories/safety.png"
                  height="150"
                  width="150"
                  alt="Safety"/>
                </div>
              </Link>
              <h2>Safety</h2>
            </Grid>
            <Grid item xs={3}>
              <Link to="/buyList/stroller">
                <div className="categoryImage strollerImage">
                  <img src="https://prelovedbabyitems.s3.us-east-2.amazonaws.com/categories/stroller.png"
                  height="150"
                  width="150"
                  alt="Strollers"/>
                </div>
              </Link>
              <h2>Strollers</h2>
            </Grid>
          </Grid>
      </div>
    </div>
  );
}

export default Categories;
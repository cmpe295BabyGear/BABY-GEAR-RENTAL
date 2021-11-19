import React from 'react';
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  banner: {
    flexGrow: 1,
  }
}));

export const Banner = () => {
  const classes = useStyles();
  return (
      <div className={classes.banner}>
        <Grid container className="bannerContent">
          <Grid item md={3} xs={0}>
            <div className="image1"></div>
          </Grid>
          <Grid item md={2} xs={0}>
            <div className="image2"></div>
          </Grid>
          <Grid item md={4} xs={12}>
            <div className="bannerText">
              <div className="heading">Spend Less Save More!</div>
              <span>Buy or Rent preloved products at affordable prices</span>
              <Link to="/buyList/all"><Button variant="contained" color="secondary">Shop Now</Button></Link>
            </div>
          </Grid>
          <Grid item md={3} xs={0}>
          <div className="image3"></div>
          </Grid>
        </Grid>
      </div>
  );
}

export default Banner;
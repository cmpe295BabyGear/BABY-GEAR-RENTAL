import React from 'react';
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
          <Grid item xs={3}>
            <div className="image1"></div>
          </Grid>
          <Grid item xs={2}>
            <div className="image2"></div>
          </Grid>
          <Grid item xs={4}>
            <div className="bannerText">
              <div className="heading">Spend Less Save More!</div>
              <span>Buy or Rent preloved products at affordable prices</span>
              <Button variant="contained" color="secondary">Shop Now</Button>
            </div>
          </Grid>
          <Grid item xs={3}>
          <div className="image3"></div>
          </Grid>
        </Grid>
      </div>
  );
}

export default Banner;
import React from 'react';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import FilterPanel from './FilterPanel';
import FilteredBuyList from './FilteredBuyList';

export const BuyList = () => {
  const useStyles = makeStyles((theme) => ({
    search: {
      flexGrow: 1,
      marginTop: theme.spacing(2),
    },
    buyListContainer: {
      padding: theme.spacing(2),
    },
    filterPaper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      background: '#f6f0f096'
    },
    listPaper: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      // background: '#faf6f6'
      // background: '#d9fcf994',
      backgroundColor: 'rgba(156, 39, 176, 0.08)'
    },
  }));
  const classes = useStyles();
  const [filteredBuyList, setFilteredBuyList] = React.useState([]);

  return (
    <Container className={classes.buyListContainer}>
      <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
              <Paper className={classes.filterPaper}>
                  <FilterPanel onSearch={(data) => setFilteredBuyList(data)}/>
              </Paper>
          </Grid>
          <Grid item xs={12} sm={9}>
              <Paper className={classes.listPaper}>
                  <FilteredBuyList filteredBuyList={filteredBuyList}/>
              </Paper>
          </Grid>
      </Grid>
    </Container>
  );
}

export default BuyList;
import React, { useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './style';
import GetAllProducts from '../../../services/GetAllProducts';
import GetItemsOnFilterCriteria from '../../../services/GetItemsOnFilterCriteria';

export const FilteredBuyList = (props) => {
    const [productList, setProductList] = React.useState([]);
    const [activePathState, setPathActiveState] = React.useState('buy');
    const classes = useStyles();

    const location = useLocation();

    useEffect(() => {
      const path = location.pathname;
      const currentState = path.split('/').pop();   
      setPathActiveState(currentState);
    }, [location]);
    
    useEffect(() => {
      GetAllProducts().then(function (response) {
        if (activePathState === 'buy' || activePathState === 'all') {
          const buyList = response.allProducts.filter(function(item){
            return item.seller_preference === 'SELL' && item.availability_status === 1;
          });
          setProductList(buyList);
        } else if (activePathState === 'rent') {
          const buyList = response.allProducts.filter(function(item){
            return item.seller_preference === 'RENT' && item.availability_status === 1;
          });
          setProductList(buyList);
        } 
      })
      .catch(function (error) {
          setProductList([]);
          console.log('All Products error', error);
      });
    }, [activePathState]);
    useEffect(() => {    
        if (props.filteredBuyList.filteredBuyList)
          setProductList(props.filteredBuyList.filteredBuyList);
        else if (props.filteredBuyList && props.filteredBuyList.length !== 0)
          setProductList(props.filteredBuyList);
        else
        setProductList([]);

    }, [props.filteredBuyList]);
    
    const getpathQuery = (itemId) => {
        const pathQuery = "/productDetails/" + itemId;
        return {
            pathname: pathQuery
        };
    };

    return (
        <Container maxWidth={false} className="filteredBuyList">
          <Grid container item spacing={3}>
            {productList.map((product, index) => (
              <Grid item spacing={2} xs={12} sm={4}>
                <Card className={classes.productCard} key={index}>
                  <div item className={classes.productImageWrap}>
                    <Link to={getpathQuery(product.item_id)} style={{ textDecoration: 'none', display: 'block', color:"inherit" }}>
                      <CardMedia
                          component='img'
                          alt={product.item_name}
                          image={product.image}
                          title={product.item_name}
                          className="productImage"
                      />
                    </Link>
                  </div>
                  <Grid item xs={12} sm={12}>
                    <Link to={getpathQuery(product.item_id)} style={{ textDecoration: 'none', display: 'block', color:"inherit" }}>
                        <h4 className="productName" >{product.item_name}</h4>
                    </Link>
                    <div className={classes.productCategory}>
                      <span>Category: </span>
                      <span className="capitalize">{product.categoryName}</span>
                    </div>
                    <div>
                      <span>Condition: </span>
                      {product.condition !== 'new' ? <span>Used - </span> : null}
                      <span className="capitalize">{product.condition}</span>
                    </div>
                    { activePathState === 'buy' || activePathState === 'all' ? <div className="priceWrap">
                      <span>Buy</span>
                      <span>${product.price}</span>
                    </div>:
                    null
                    }
                    { activePathState === 'rent' ? <div className="priceWrap">
                      <span>Rent</span>
                      <span>${product.rental_price} per day</span>
                    </div> : 
                    null
                    }
                  </Grid>
                </Card>
              </Grid>
            ))}
            </Grid>
        </Container>
    );
};

export default FilteredBuyList;
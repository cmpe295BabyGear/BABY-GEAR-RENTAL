import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

import { useStyles } from './style';
import GetAllProducts from '../../../services/GetAllProducts';
import GetItemsOnFilterCriteria from '../../../services/GetItemsOnFilterCriteria';

export const FilteredBuyList = (props) => {
    const [productList, setProductList] = React.useState([]);
    const classes = useStyles();
    
    useEffect(() => {
        const path = window.location.pathname;
        const category = path.split('/').pop();   
        if (category !== 'all') {
          const categoryName  = category.toString().toLowerCase();
          GetItemsOnFilterCriteria({categoryName}).then(function (response) {
            setProductList(response.filteredBuyList);
            console.log('GetItemsOnFilterCriteria', response);
        })
          .catch(function (error) {
              console.log('GetItemsOnFilterCriteria error', error);
          });
        } else {
          GetAllProducts().then(function (response) {
            setProductList(response.allProducts);
              console.log('All Products', response);
          })
          .catch(function (error) {
              setProductList([]);
              console.log('All Products error', error);
          });
        }
    }, []);
    useEffect(() => {    
        if (props.filteredBuyList.filteredBuyList)
        setProductList(props.filteredBuyList.filteredBuyList);
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
                    <div className="priceWrap">
                      <span>Buy</span>
                      <span>${product.price}</span>
                    </div>
                  </Grid>
                </Card>
              </Grid>
            ))}
            </Grid>
        </Container>
    );
};

export default FilteredBuyList;
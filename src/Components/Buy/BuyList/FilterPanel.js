import React, { useEffect }  from 'react';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

import { useStyles } from './style';
import GetItemsOnFilterCriteria from '../../../services/GetItemsOnFilterCriteria';

export const FilterPanel = (props) => {
    const classes = useStyles();
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    };
    const categoryList = [
        "Bath", "CarSeat", "Crib", "HighChair", "Safety ", "Stroller"
    ];
    const conditionList = [
      "New", "Like New", "Good", "Fair"
    ];

    const [category, setCategory] = React.useState([]);
    const [condition, setCondition] = React.useState([]);
    const [price, setPriceValue] = React.useState([0, 0]);
    const [defaultCategory, setDefaultCategory] = React.useState("");

      useEffect(() => {
        const path = window.location.pathname;
        const categoryPath = path.split('/').pop();   
        if (categoryPath !== 'all') {
          setDefaultCategory(categoryPath);
        }
    }, []);
    
    const serchClick = () => {
        const filterQuery = {};

        const formattedCategory = category.toString().toLowerCase();
        filterQuery.categoryName = formattedCategory !== '' ? formattedCategory : '';

        const formattedCondition = condition.toString().toLowerCase();
        filterQuery.item_condition = formattedCondition !== '' ? formattedCondition : '';

        if (price[0] > 0 || price[1] > 0) {
          filterQuery.lowPrice = price.map(String)[0];
          filterQuery.highPrice = price.map(String)[1];
        }

        GetItemsOnFilterCriteria(filterQuery).then(function (response) {
            props.onSearch(response);
            console.log('GetItemsOnFilterCriteria', response);
        })
        .catch(function (error) {
            console.log('GetItemsOnFilterCriteria error', error);
        });
    };

    return (
        <Container maxWidth={false} className={"filterPanel "+ classes.filterpanel}>
            {/* Category Input Field */}
            <FormControl className={classes.formControl}>
                <InputLabel shrink className={classes.selectBoxInput}>
                    Category
                </InputLabel>
                <Select
                    multiple
                    defaultValue={defaultCategory}
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {categoryList.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={category.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            
            {/* Price Input Field */}
            <div className={classes.sliderWrap}>
                <span className={classes.labelStyle}>Price Range (In Dollar)</span>
                <Slider
                    value={price}
                    onChange={(e, newValue) => setPriceValue(newValue)}
                    valueLabelDisplay='on'
                    aria-labelledby='range-slider'
                    style={{ marginTop: '30px' }}
                    max="200"
                    color='secondary'
                />
            </div>

            {/* Condition Input Field */}
            <FormControl className={classes.formControl}>
                <InputLabel shrink className={classes.selectBoxInput}>
                    Product Condition
                </InputLabel>
                <Select
                    multiple
                    value={condition}
                    onChange={(event) => setCondition(event.target.value)}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {conditionList.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={condition.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Search Button */}
            <div className={classes.buttonWrap}>
                <Button variant='contained' color='secondary' onClick={serchClick}>
                    Search
                </Button>
            </div>
        </Container>
    );
};

export default FilterPanel;
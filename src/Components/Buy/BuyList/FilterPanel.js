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
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import { DateRangePicker } from "materialui-daterange-picker";

import GetItemsOnFilterCriteria from '../../../services/GetItemsOnFilterCriteria';
import GetAllProducts from '../../../services/GetAllProducts';

import { useStyles } from './style';

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

    const locationList = [
        "Los Angeles, CA", "Los Gatos, CA", "Monterey, CA", "San Diego, CA", "San Francisco, CA ", "Santa Cruz, CA"
    ];
    const categoryList = [
        "Bath", "CarSeat", "Crib", "HighChair", "Safety ", "Stroller"
    ];
    const conditionList = [
      "New", "Like New", "Good", "Fair"
    ];

    const [location, setLocation] = React.useState([]);
    const [category, setCategory] = React.useState([]);
    const [condition, setCondition] = React.useState([]);
    const [price, setPriceValue] = React.useState([0, 0]);
    const [defaultCategory, setDefaultCategory] = React.useState("");
    const [purchaseType, setPurchaseType] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState({});
    
    const toggle = () => {
        setOpen(!open)
        console.log(dateRange);
    };

      useEffect(() => {
        const path = window.location.pathname;
        const categoryPath = path.split('/').pop();   
        if (categoryPath !== 'all') {
          setDefaultCategory(categoryPath);
        }
    }, []);
    
    const clearFilter = () => {
        GetAllProducts().then(function (response) {
            props.onSearch(response.allProducts);

            setLocation([]);
            setCategory([]);
            setCondition([]);
            setPriceValue([0,0]);
            setDefaultCategory("");
            setPurchaseType([]);
            setOpen(false);
            setDateRange({});
            console.log('All Products', response);
        })
        .catch(function (error) {
            props.onSearch([]);
            console.log('All Products error', error);
        });
    }
    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const selectPurchaseType = (value) => {
        setPurchaseType(value)
        if(value === "RENT") {
            setOpen(true);
        } else {
            setOpen(false);
            setDateRange({});
        }
    }
    const serchClick = () => {
        const filterQuery = {};

        const formattedLocation = location.toString().toLowerCase();
        filterQuery.locationName = formattedLocation !== '' ? formattedLocation : '';

        const formattedCategory = category.toString().toLowerCase();
        filterQuery.categoryName = formattedCategory !== '' ? formattedCategory : '';

        const formattedCondition = condition.toString().toLowerCase();
        filterQuery.item_condition = formattedCondition !== '' ? formattedCondition : '';

        filterQuery.seller_preference = purchaseType;

        if (purchaseType === 'RENT') {
            filterQuery.lease_startDT = formatDate(dateRange.startDate);
            filterQuery.lease_endDT = formatDate(dateRange.endDate);
        }
        

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
            {/* Location Input Field */}
            <FormControl className={classes.formControl}>
                <InputLabel shrink className={classes.selectBoxInput}>
                    Location
                </InputLabel>
                <Select
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    MenuProps={MenuProps}
                >
                    {locationList.map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

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

            {/* Purchase Type Radio Buttons */}
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Purchase Type</FormLabel>
                <RadioGroup
                    row aria-label="purchaseType"
                    name="row-radio-buttons-group"
                    value={purchaseType}
                    onChange={(event) => selectPurchaseType(event.target.value)}
                >
                    <FormControlLabel value="SELL" control={<Radio color='secondary'/>} label="Buy" />
                    <FormControlLabel value="RENT" control={<Radio color='secondary'/>} label="Rent" />
                    <FormControlLabel value="BOTH" control={<Radio color='secondary'/>} label="Both" />
                </RadioGroup>
            </FormControl>

            {/* Date Range Selector */}
            <DateRangePicker
                open={open}
                toggle={toggle}
                onChange={(range) => setDateRange(range)}
            />
            {/* Search Button */}
            <div className={classes.buttonWrap}>
                <Button variant='contained' color='secondary' onClick={serchClick}>
                    Search
                </Button>
                <Button onClick={clearFilter} className={classes.clearFilter}>Clear Filter</Button>
            </div>
        </Container>
    );
};

export default FilterPanel;
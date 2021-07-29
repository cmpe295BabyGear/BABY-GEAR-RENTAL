import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    filterpanel: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: '100%',
        color: '#000'
    },
    selectBoxInput: {
        width: '100%',
        color: '#7c7979',
        textAlign: 'left',
        fontSize: '1.2em'
    },
    formControl: {
        margin: '30px 0 0 0',
        width: '100%',
        textAlign: 'left'
    },
    sliderWrap: {
        width: '100%'
    },
    labelStyle: {
        color: '#7c7979',
        fontSize: '1.07em',
        display: 'block',
        margin: '30px 0 10px 0',
        textAlign: 'left'
    },
    buttonWrap: {
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    },
    productCard: {
      padding: "10px"
  },
  productImageWrap: {
      display: "flex",
      justifyContent: "center"
  },
  productImage: {
    height: "180px",
    width: "180px"
  },
  chefContent: {
      textAlign: "left",
  },
  productName: {
      fontSize: "1.3em",
      margin: "10px 0 0 0",
      color: "#80bfcd",
      textTransform: "capitalize"
  },
  chefLocation: {
      fontSize: "0.9em",
      fontWeight: "600"
  },
  productCategory: {
      fontSize: "0.9em",
      border: "2px solid #e59161c2",
      padding: "5px",
      borderRadius: "5px"
  },
  chefRating: {
      margin: '5px 10px'
  },
  reviewRating: {
      display: "flex"
  },
  locationPrice: {
      display: "flex",
      justifyContent: "space-between"
  },
  chefPrice: {
      color: "#3e51b5",
      fontSize: "1.2em",
      fontWeight: "bold",
      display: "block",
      textAlign: "center"
  },
  chefPriceHourText: {
      display: "block",
      color: "gray",
      fontSize: "0.9em"
  }
}));
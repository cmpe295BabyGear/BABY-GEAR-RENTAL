import axios from "axios";

export const CheckoutCart = (customerId, itemList) => {
  return new Promise((resolve, reject) => {
    axios.get("https://e8jtpxpzhf.execute-api.us-east-2.amazonaws.com/dev/checkoutcart?itemList=" + itemList + "&customerId=" + customerId)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};



export default CheckoutCart;
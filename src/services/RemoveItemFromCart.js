import axios from "axios";

const RemoveItemFromCart = (event) => {
  return new Promise((resolve, reject) => {
    axios.put("https://yc6p632uxl.execute-api.us-east-2.amazonaws.com/dev/updatecart", event)
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default RemoveItemFromCart;
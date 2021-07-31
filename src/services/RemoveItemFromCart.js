import axios from "axios";

const RemoveItemFromCart = (event) => {
  return new Promise((resolve, reject) => {
    axios.put("https://sy1p0gdgq8.execute-api.us-east-2.amazonaws.com/dev/removefromcart", event)
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default RemoveItemFromCart;
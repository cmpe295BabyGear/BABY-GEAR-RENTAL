import axios from "axios";

const AddItemToCart = (event) => {
  return new Promise((resolve, reject) => {
    axios.put("https://7wko7ehms3.execute-api.us-east-2.amazonaws.com/dev/addtocart", event)
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default AddItemToCart;
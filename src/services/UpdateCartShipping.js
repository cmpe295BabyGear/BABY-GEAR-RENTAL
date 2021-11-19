import axios from "axios";

const UpdateCartShipping = (event) => {
  return new Promise((resolve, reject) => {
    axios.put("https://0aa1x1lfj9.execute-api.us-east-2.amazonaws.com/dev/updateCartShipping", event)
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default UpdateCartShipping;
import axios from "axios";

const DeleteCartItems = (customerId) => {
  return new Promise((resolve, reject) => {
    axios.delete("https://7l33vcbpu6.execute-api.us-east-2.amazonaws.com/dev//deletecustcartonorder?customerId=" + customerId)
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default DeleteCartItems;
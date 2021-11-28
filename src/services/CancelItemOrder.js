import axios from "axios";

export const CancelItemOrder = (orderId, itemId) => {
  return new Promise((resolve, reject) => {
    axios.get("https://bb3w6kr8zb.execute-api.us-east-2.amazonaws.com/dev/cancelitemorder?orderId=" + orderId + "&itemId=" + itemId)
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};



export default CancelItemOrder;
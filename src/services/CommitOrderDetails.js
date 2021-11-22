import axios from 'axios';

const CommitOrderDetails = (customerId) => {
  return new Promise((resolve, reject) => {
    axios.post('https://nyzcyp0io5.execute-api.us-east-2.amazonaws.com/dev/postorderdetails?customerId=' + customerId
    )
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default CommitOrderDetails;
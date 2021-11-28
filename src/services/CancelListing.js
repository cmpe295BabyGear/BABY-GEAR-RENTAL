import axios from 'axios'

const CancelListing = (event) => {
  return new Promise((resolve, reject) => {
    axios.put('https://5pdevcet68.execute-api.us-east-2.amazonaws.com/dev/cancellisting', event)
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default CancelListing
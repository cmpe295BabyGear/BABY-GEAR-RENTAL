import axios from 'axios'

const updateAddress = (event) => {
  return new Promise((resolve, reject) => {
    axios.put('https://idc9iq1533.execute-api.us-east-2.amazonaws.com/dev/updateaddress', event)
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default updateAddress

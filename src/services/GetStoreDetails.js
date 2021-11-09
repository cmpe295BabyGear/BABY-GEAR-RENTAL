import axios from "axios";

export const GetStoreDetails = (event) => {
    return new Promise((resolve, reject) => {
        axios.get("https://wc7wgerf24.execute-api.us-east-2.amazonaws.com/dev/getStoreDetails?zipcode=" + event)
      .then(function (response) {
        if (response.data !== null) {
          resolve(response.data[0]);
        }
      })
      .catch(function (error) {
        reject(error);
      });
    });
};

export default GetStoreDetails;
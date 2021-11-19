import axios from "axios";

export const GetCustomerDetails = (event) => {
    return new Promise((resolve, reject) => {
        axios.get("https://rxf7xiprnd.execute-api.us-east-2.amazonaws.com/dev/getcustomerdetails?email_id=" + event)
      .then(function (response) {
        if (response.data !== null) {
          const customerDetails = response.data[0];
          resolve(customerDetails);
        }
      })
      .catch(function (error) {
        reject(error);
      });
    });
};



export default GetCustomerDetails;
import axios from "axios";

const AddSignUpDetails = (event) => {
  return new Promise((resolve, reject) => {
    axios.put("https://6fwo2upg67.execute-api.us-east-2.amazonaws.com/dev/putcustomerdetails", event)
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default AddSignUpDetails;
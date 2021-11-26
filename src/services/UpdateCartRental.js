import axios from "axios";

const UpdateCartRental = (event) => {
  return new Promise((resolve, reject) => {
    axios.put("https://9ws83pff6a.execute-api.us-east-2.amazonaws.com/dev/updatecartrental", event)
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default UpdateCartRental;
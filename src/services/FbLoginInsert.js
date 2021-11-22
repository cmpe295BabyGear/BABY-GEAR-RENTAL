import axios from "axios";

export const FbLoginInsert = (emailId, lastName) => {
  return new Promise((resolve, reject) => {
    axios.get("https://ci5fgu512e.execute-api.us-east-2.amazonaws.com/dev/fblogininsert?emailId=" + emailId + "&lastName=" + lastName)
      .then(function (response) {
          resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};



export default FbLoginInsert;
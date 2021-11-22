import axios from 'axios'

const UpdateItemStatusOnOrder = (itemList) => {
  return new Promise((resolve, reject) => {
    axios.put('https://od6schzep9.execute-api.us-east-2.amazonaws.com/dev/updateitemstatusonorder?itemList=' + itemList)
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default UpdateItemStatusOnOrder;
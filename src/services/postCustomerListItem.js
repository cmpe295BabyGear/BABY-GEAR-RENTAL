import axios from 'axios';

const PostCustomerListItem = (event) => {
  return new Promise((resolve, reject) => {
    axios.post('https://dx71emejk6.execute-api.us-east-2.amazonaws.com/dev/postcustomerlistitems', event
    )
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default PostCustomerListItem;
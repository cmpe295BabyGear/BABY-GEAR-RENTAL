import axios from 'axios'

const SaveItems = (event) => {
  return new Promise((resolve, reject) => {
    axios.post('https://c4rierwwec.execute-api.us-east-2.amazonaws.com/dev/postitems', event)
      .then(function (res) {
        resolve(true)
      }).catch(function (err) {
        reject(err)
      })
  });
}
export default SaveItems;






 // Function to post cust item for aproval.
 export async function postCustItem(custItem){
    // Temporarily commented below code as API to aprove customer item is not ready yet.
    const postCustItemEndpoint='https://c4rierwwec.execute-api.us-east-2.amazonaws.com/dev/postitems';
    const { data } = await axios.post(postCustItemEndpoint, custItem);
    return data;

    //return {};
  }
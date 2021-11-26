import axios from 'axios';

// Returns list of customer items.
export default async function getCustomerItems({queryKey}){
   // const customerId=queryKey[1];
    const getCustItemsEndpoint=`https://cgh3ttxhgl.execute-api.us-east-2.amazonaws.com/dev/get-listings`;
    const { data } = await axios.get(getCustItemsEndpoint);
    return data
  }
  
  

  // Function to post cust item for aproval.
  export async function postCustItem(custItem){
    // Temporarily commented below code as API to aprove customer item is not ready yet.
    const postCustItemEndpoint='https://c4rierwwec.execute-api.us-east-2.amazonaws.com/dev/postitems';
    console.log("custItem");
    console.log(custItem);
    const { data } = await axios.post(postCustItemEndpoint, custItem);
    return data;

    //return {};
  }
import axios from 'axios';

// Returns list of customer items.
export default async function getCustomerItems({queryKey}){
    const getCustItemsEndpoint=`https://cgh3ttxhgl.execute-api.us-east-2.amazonaws.com/dev/get-listings`;
    const { data } = await axios.get(getCustItemsEndpoint);
    return data
  }
  
  

  // Function to post cust item for aproval.
  export async function postCustItem(custItem){
    const postCustItemEndpoint='https://c4rierwwec.execute-api.us-east-2.amazonaws.com/dev/postitems';
    console.log("custItem");
    console.log(custItem);
    const { data } = await axios.post(postCustItemEndpoint, custItem);
    return data;
  }

  export async function postRejectCustItem(custItem){
    const postCustItemEndpoint='https://3nife0vqlc.execute-api.us-east-2.amazonaws.com/dev/reject';
    console.log("reject Item");
    console.log(custItem);
    const { data } = await axios.put(postCustItemEndpoint, custItem);
    return data;
  }
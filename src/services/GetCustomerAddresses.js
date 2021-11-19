import axios from 'axios'

const GetCustomerAddresses = (customerId) => {
  return new Promise((resolve, reject) => {
    axios.get('https://t3sggo877i.execute-api.us-east-2.amazonaws.com/dev/getcustomeraddresses?customer_id=' + customerId)
      .then(function (response) {
        const custAddr = [];
        if (response.data.length > 0) {
          response.data.forEach(function (element) {
            custAddr.push({
              id: element.id,
              customer_id: element.customer_id,
              name: element.name,
              address1: element.address1,
              address2: element.address2,
              city: element.city,
              state: element.state,
              country: element.country,
              zipcode: element.zipcode,
              isDefault: element.isDefault,
              formatted_address: element.formatted_address
            });
          })
          console.log('custAddr')
          console.log(custAddr)
          resolve(custAddr)
        }
      }).catch(function (err) {
        console.log(err)
        reject(err)
      })
  });
}
export default GetCustomerAddresses

import axios from 'axios';

const GetCustomerOrders = (customerId) => {
  return new Promise((resolve, reject) => {
    axios.get('https://zznnlciq92.execute-api.us-east-2.amazonaws.com/dev/getcustomerorderdetails?customer_id=' + customerId)
      .then(function (response) {
        const orderList  = [];
        if (response.data.length > 0) {
          response.data.forEach(function (element) {
            orderList.push({
              id: element.id,
              orderID: element.order_id,
              itemID: element.item_id,
              customerID: element.customer_id,
              orderDate: element.order_date,
              quantity: element.quantity,
              price: element.price,
              orderType: element.order_type,
              rentStartDate: element.lease_startDT,
              rentEndDate: element.lease_endDT,
              item_name: element.item_name,
              OrderStatus: element.orderStatus,
              image: 'https://d1d6i97vlsh97n.cloudfront.net/' + element.seller_email + '/' + element.item_category + '/' + element.s3_label + '.jpg'
            });
          });
          console.log('response: ', response);
          resolve({ orderList });
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export default GetCustomerOrders;
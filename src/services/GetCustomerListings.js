import axios from 'axios';

const GetCustomerOrders = (customerId) => {
  return new Promise((resolve, reject) => {
    axios.get('https://oslnzm1zy3.execute-api.us-east-2.amazonaws.com/dev/getcustomerlistings?customerId=' + customerId)
      .then(function (response) {
        const customerItemListings = [];
        var itemStatus = ''
        if (response.data.length > 0) {
          response.data.forEach(function (element) {
            console.log('element ... ', element)
            itemStatus = element.seller_preference == 'SELL' ? 'SOLD' : 'RENTED';
            customerItemListings.push({
              id: element.id,
              itemName: element.item_name,
              categoryName: element.category_name,
              decription: element.decription,
              condition: element.condition,
              brand: element.brand,
              price: element.price,
              adminStatus: element.admin_status,
              sellerPreference: element.seller_preference,
              babyAge: element.baby_age,
              rentalPrice: element.rental_price,
              customerEmail: element.customer_email,
              availabilityStatus: element.availability_status == 1 ? 'AVAILABLE' : itemStatus ,
              image: 'https://d1d6i97vlsh97n.cloudfront.net/' + element.customer_email + '/' + element.category_name + '/' + element.s3_label
            });
          });
          console.log('response: ', response);
          resolve({ customerItemListings });
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export default GetCustomerOrders;
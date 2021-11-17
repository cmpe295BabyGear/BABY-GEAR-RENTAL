import axios from "axios";

const GetCartDetails = (event) => {
  return new Promise((resolve, reject) => {
    axios.get("https://7gikeureg5.execute-api.us-east-2.amazonaws.com/dev/getcustomercartitems?customer_id=" + event)
      .then(function (response) {
        const cartList = [];
        if (response.data.length > 0) {
          response.data.forEach(function (element) {
            cartList.push({
              item_id: element.item_id,
              price: element.price,
              condition: element.condition,
              item_name: element.item_name,
              categoryName: element.categoryName,
              brand: element.brand,
              purchaseType: element.purchase_type,
              deliveryOption: element.delivery_option,
              rentStartDate: element.rent_start_date,
              rentEndDate: element.rent_end_date,
              image: 'https://d1d6i97vlsh97n.cloudfront.net/' + element.seller_email + '/' + element.categoryName + '/' + element.s3_label
            });
          });
          console.log("response.................x", response);
          resolve({ cartList });
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export default GetCartDetails;
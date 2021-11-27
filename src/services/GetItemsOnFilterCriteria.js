import axios from "axios";

const GetItemsOnFilterCriteria = (event) => {
  return new Promise((resolve, reject) => {
    axios.get("https://jb7ofp5h09.execute-api.us-east-2.amazonaws.com/dev/getitemsonfiltercriteria", {
      params: event 
      }
      )
      .then(function (response) {
        const filteredBuyList = [];
        if (response.data.length > 0) {
          response.data.forEach(function (element) {
            filteredBuyList.push({
              item_id: element.item_id,
              price: element.price,
              condition: element.condition,
              item_name: element.item_name,
              categoryName: element.categoryName,
              brand: element.brand,
              rental_price: element.rental_price,
              image: 'https://d1d6i97vlsh97n.cloudfront.net/' + element.email_id + '/' + element.categoryName + '/' + element.s3_label + '.jpg'
            });
          });
          console.log("response.................x", response);
          resolve({ filteredBuyList });
        } else {
          resolve({ filteredBuyList: [] });
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default GetItemsOnFilterCriteria;
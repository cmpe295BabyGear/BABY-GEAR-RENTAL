import axios from "axios";

const GetAllProducts = (event) => {
  return new Promise((resolve, reject) => {
    axios.get("https://kmyrcczypf.execute-api.us-east-2.amazonaws.com/dev/getallitems")
      .then(function (response) {
        const allProducts = [];
        if (response.data.length > 0) {
          response.data.forEach(function (element) {
            allProducts.push({
              item_id: element.item_id,
              price: element.price,
              condition: element.condition,
              item_name: element.item_name,
              categoryName: element.categoryName,
              brand: element.brand,
              image: 'https://d1d6i97vlsh97n.cloudfront.net/' + element.email_id + '/' + element.categoryName + '/' + element.s3_label
            });
          });
          resolve({ allProducts });
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export default GetAllProducts;
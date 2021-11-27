import axios from "axios";

export const GetProductDetails = (event) => {
    return new Promise((resolve, reject) => {
        axios.get("https://8dumchabqj.execute-api.us-east-2.amazonaws.com/dev/getitemdetails?item_id=" + event)
      .then(function (response) {
        if (response.data !== null) {
          const productDetails = response.data[0];
          productDetails.image = 'https://d1d6i97vlsh97n.cloudfront.net/' + productDetails.email_id + '/' + productDetails.categoryName + '/' + productDetails.s3_label + '.jpg';
          resolve(productDetails);
        }
      })
      .catch(function (error) {
        reject(error);
      });
    });
};

export default GetProductDetails;
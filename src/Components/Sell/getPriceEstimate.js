import axios from "axios";

const GetPriceEstimate = (event) => {
  return new Promise((resolve, reject) => {
    axios.get("https://qmd3ari8gg.execute-api.us-east-2.amazonaws.com/dev/getpriceestimate"+ event)
      .then(function (response) {
        const priceEstimate = [];
        if (response.data.length === 1) {
            priceEstimate.push({
                id: response.data[0].id,
                category_id: response.data[0].category_id,
                condition: response.data[0].condition,
                price_estimate: response.data[0].price_estimate
            });
            console.log("response.................x", response);
            resolve({ priceEstimate });
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export default GetPriceEstimate;
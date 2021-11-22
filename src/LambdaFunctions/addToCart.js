var mysql = require('mysql');
var util = require('util');
var config = require('./config.json');

exports.handler = (event, context, callback) => {
  var conn = mysql.createConnection({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname
  });

  context.callbackWaitsForEmptyEventLoop= false;
  
  console.log('event ------',event);
  try{
    const queryString = "INSERT INTO cart_items(`customer_id`, `item_id`,`item_category`,`item_name`,`quantity`, `purchase_type`, `delivery_option`, `rent_start_date`, `rent_end_date`, `display_price`, `rental_price`, `store_address`) SELECT '" + 
                        event.customer_id + "' as customer_id,'" + event.item_id + "' as item_id , id, '" + event.item_name + "' as item_name, '" + event.quantity + "'as quantity, '" +
                        event.purchaseType + "' as purchase_type, '" +
                        event.deliveryOption + "' as delivery_option, '" +
                        event.rentStartDate + "' as rent_start_date, '" +
                        event.rentEndDate + "' as rent_end_date, '" +
                        event.displayPrice + "' as display_price, '" +
                        event.rentalPrice + "' as rental_price, '" +
                        event.storeAddress + "' as store_address FROM item_category where categoryName = '" + event.categoryName + "';";    
    var result = conn.query(queryString, function(error, results, fields) {
      if (error) { 
        console.log(error); 
        callback(error); 
        return; 
      }
      else { 
        console.log(results); 
        callback(null, results);
      }
    });
  }catch(err){
    console.log(err);
  }
  finally{
    conn.end();
  }
};


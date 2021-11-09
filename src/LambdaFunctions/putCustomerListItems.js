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

  context.callbackWaitsForEmptyEventLoop = false;

  console.log('event ------', event);

  // Fk's- customer_id, item_category
  //const queryString = "INSERT INTO cart_items(`customer_id`, `item_id`,`item_category`,`item_name`,`quantity`) SELECT '" + 
  // event.customer_id + "' as customer_id,'" + event.item_id + "' as item_id , id, '" + event.item_name + "' as item_name, '" + event.quantity + "'as quantity FROM item_category where categoryName = '" + event.categoryName + "';";    
  try {
    const queryString = "INSERT INTO customer_item(`customer_id`,`item_name`, `description`,`s3_label`,`admin_status`,`condition`,`brand`,`price`,`seller_preference`,`baby_age`,`rental_price`,`item_category` ) SELECT '"
      + event.customer_id + "','" + event.item_name + "', '" + event.description + "','" + event.s3_label + "','" + event.admin_status + "' , '" + event.condition + "','" + event.brand + "','" + event.price + "' ,'" + event.seller_preference + "','" + event.baby_age + "' ,'" + event.rental_price + "', id FROM item_category where id = " + event.item_category + ";";

    //  SELECT id FROM item_category WHERE (item_category.id = customer_item.item_category) ;
    console.log(queryString)
    conn.query(queryString, function (error, results, fields) {

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
  } catch (err) {
    console.log(err);
  }
  finally {
    conn.end();
  }
};

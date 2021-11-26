var mysql = require('mysql');
var util = require('util');
var config = require('./config.json');

exports.handler = (event, context, callback) => {

   var conn = mysql.createConnection({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname,
    connectionLimit: 10
  });

  context.callbackWaitsForEmptyEventLoop = false;

  console.log('event ------', event);

  var sqlQuery = `select ci.id as cart_id, ci.customer_id,i.rental_price, i.price,i.s3_label, c.email_id as customer_email ,s.email_id as seller_email,i.id as item_id, ic.categoryName as categoryName, i.item_name , ci.quantity, ci.purchase_type, ci.delivery_option, ci.rent_start_date, ci.rent_end_date, ci.display_price, ci.rental_price, ci.store_address from cart_items ci `+
                  `join items i `+
                  `on ci.item_id = i.id `+
                  `join customer c `+
                  `on ci.customer_id = c.id `+
                  `join customer s `+
                  `on i.customer_id = s.id `+
                  `join item_category ic `+
                  `on ci.item_category = ic.id `+
                  `where ci.customer_id = ${event.queryStringParameters.customer_id};`;
    try {
      conn.query(sqlQuery, function (error, results, fields) {
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
    }
    catch(err){
      console.log(err);
    }
    finally{
      conn.end();
    }
}

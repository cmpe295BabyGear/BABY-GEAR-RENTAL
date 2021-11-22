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
  try {
    const orderId = Date.now();
    var sqlQuery = ` INSERT INTO cmpe295.order_details (order_id, customer_id, item_id , order_date, quantity, price, order_type, lease_startDT, lease_endDT, order_status, item_category) ` +
      ` SELECT ${orderId}, customer_id , item_id, CURDATE(), quantity, display_price, purchase_type, rent_start_date, rent_end_date, 'pending' as orderStatus, item_category ` +
      ` FROM cmpe295.cart_items ci ` +
      ` join customer c ` +
      ` on ci.customer_id = c.id ` +
      ` where ci.customer_id = ${event.queryStringParameters.customerId}`;

    conn.query(sqlQuery, function (error, results, fields) {
      // connection.destroy();
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
}




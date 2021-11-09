var mysql = require('mysql');
var util = require('util');
var config = require('./config.json');

exports.handler = (event, context, callback) => {

  var conn = mysql.createConnection({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname,
    multipleStatements: true
  });

  context.callbackWaitsForEmptyEventLoop = false;

  console.log('event ------', event);
  try {
    const itemId = event.queryStringParameters.item_id;
    const customerId = event.queryStringParameters.customer_id;
    var sqlQuery = `update cart_items set quantity = quantity-1 where item_id = ${itemId} and customer_id = ${customerId}; ` +
      ` delete from cart_items where item_id =${itemId} and customer_id = ${customerId} and quantity <= 0;`;

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
  } catch (err) {
    console.log(err);
  }
  finally {
    conn.end();
  }
}

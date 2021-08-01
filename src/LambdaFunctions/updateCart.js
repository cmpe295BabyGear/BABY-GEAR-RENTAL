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
    const itemId = event.item_id;
    const customerId = event.customer_id;
    var sqlQuery = `delete from cart_items where item_id = ${itemId} and customer_id = ${customerId} and quantity = 1; `;
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
  catch (err) {
    console.log(err);
  }
  finally {
    conn.end();
  }
}




var mysql = require('mysql');
var util = require('util');
var config = require('./config.json');

exports.handler = (event, context, callback) => {

  var pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname,
    multipleStatements: true
  });

  pool.query = new util.promisify(pool.query);

  context.callbackWaitsForEmptyEventLoop = false;

  console.log('event ------', event);

  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }
    const itemId = event.queryStringParameters.item_id;
    const customerId = event.queryStringParameters.customer_id;
    var sqlQuery = `update cart_items set quantity = quantity-1 where item_id = ${itemId} and customer_id = ${customerId}; ` +
      ` delete from cart_items where item_id =${itemId} and customer_id = ${customerId} and quantity <= 0;`;

    pool.query(sqlQuery, function (error, results, fields) {
      connection.destroy();
      if (error) {
        console.log(error);
        callback(error);
        return;
      }
      else {
        console.log(results);
        callback(null, results);
      }

      console.log('connection ----- ', connection);
    });
  });
}




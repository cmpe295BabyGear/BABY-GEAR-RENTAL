var mysql = require('mysql');
var util = require('util');
var config = require('./config.json');

exports.handler = (event, context, callback) => {
  var pool = mysql.createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname
  });

  pool.query = new util.promisify(pool.query);

  context.callbackWaitsForEmptyEventLoop = false;

  console.log('event ------', event);

  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
      return;
    }

    const queryString = "INSERT INTO cart_items(`customer_id`, `item_id`,`item_category`,`item_name`,`quantity`) SELECT '" +
      event.customer_id + "' as customer_id,'" + event.item_id + "' as item_id , id, '" + event.item_name + "' as item_name, '" + event.quantity + "'as quantity FROM item_category where categoryName = '" + event.categoryName + "';";
    var result = pool.query(queryString, function (error, results, fields) {
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
    });
    console.log(result);
    console.log(err);
    console.log(connection);
  });
};


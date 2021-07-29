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

    var sqlQuery = `select ci.id as cart_id, ci.customer_id,i.rental_price, i.s3_label, c.email_id as email_id,i.id as item_id, ic.categoryName as categoryName, i.item_name , ci.quantity from cart_items ci ` +
      `join items i ` +
      `on ci.item_id = i.id ` +
      `join customer c ` +
      `on ci.customer_id = c.id ` +
      `join item_category ic ` +
      `on ci.item_category = ic.id ` +
      `where ci.customer_id = ${event.queryStringParameters.customer_id};`;

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




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

    var sqlQuery = `SELECT  ci.id, ci.item_name, ci.availability_status, ic.categoryName as category_name, ci.list_date as list_date, ci.description ,ci.condition, ci.brand, ci.price * 0.90 as 'price',  ` +
      ` ci.admin_status, ci.seller_preference, ci.baby_age,ci.rental_price, ci.s3_label, c.email_id as customer_email, DATEDIFF(CURDATE(), ci.list_date) as 'totalDays'` +
      `FROM customer_item ci ` +
      `join item_category ic ` +
      `on ic.id = ci.item_category ` +
      `join customer c ` +
      `on c.id = ci.customer_id ` +
      `where ci.customer_id = ${event.queryStringParameters.customerId} && ci.s3_label != 'undefined' ` +
      `order by list_date desc`;

    console.log(sqlQuery)
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




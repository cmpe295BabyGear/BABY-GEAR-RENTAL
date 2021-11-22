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
    var sqlQuery = `SELECT od.id as id, order_id as order_id, od.customer_id, date_format(od.order_date,'%m-%d-%Y') as order_date, od.quantity, od.price, od.order_type, date_format(od.lease_startDT,'%m-%d-%Y') as lease_startDT, date_format(od.lease_endDT,'%m-%d-%Y') as lease_endDT,`
      + ` i.item_name, od.order_status , i.seller_email as seller_email, i.s3_label, od.item_category as item_category, od.item_id`
      + ` FROM order_details od `
      + ` join customer c on c.id = od.customer_id`
      + ` join items i on i.id = od.item_id`
      + ` where od.customer_id = ${event.queryStringParameters.customer_id} `
      + ` order by order_date desc`;

    console.log('query ---------', sqlQuery);
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
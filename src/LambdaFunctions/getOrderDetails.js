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

    var sqlQuery = `select od.id as order_id, od.customer_id,i.s3_label, i.id as item_id, date_format (od.order_date, '%m%d%Y') as order_date , od.quantity, od.price, order_type, ` +
      `date_format (od.lease_startDT, '%m%d%Y') as lease_startDT, date_format (od.lease_endDT, '%m%d%Y') as lease_endDT, order_status ` +
      `from order_details od ` +
      `join items i ` +
      `on od.id = ${event.queryStringParameters.orderId}`;

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




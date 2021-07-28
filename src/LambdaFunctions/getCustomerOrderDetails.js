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

    var sqlQuery = `SELECT od.id as order_id, od.customer_id, od.item_id, date_format(order_date,'%m%d%Y') as order_date,od.quantity,od.price,od.order_type,date_format(lease_startDT,'%m%d%Y') as lease_startDT, `+
                    `date_format(lease_endDT,'%m%d%Y') as lease_endDT, od.order_status  FROM order_details od `+
                    `join customer c `+
                    `on c.id = od.customer_id `+
                    `where od.customer_id = 1;`;

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
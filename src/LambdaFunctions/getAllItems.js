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

    var sqlQuery = `SELECT i.id as item_id, i.customer_id,c.email_id as email_id,i.s3_label, i.rental_price, item_name,i.description,baby_age,i.condition,brand,DATE_FORMAT(lease_startDT, '%m/%d/%Y') as lease_startDT, DATE_FORMAT(lease_endDT, '%m/%d/%Y') as lease_endDT, ` +
      `price, availability_status,ic.categoryName as categoryName, item_status, seller_preference ` +
      `from items i ` +
      `join item_category ic ` +
      `on ic.id = i.item_category ` +
      `join customer c ` +
      `on c.id = i.customer_id ;`;


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




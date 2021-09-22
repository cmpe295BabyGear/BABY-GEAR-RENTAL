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
    const queryString = "INSERT INTO address_details(`customer_id`,`name`,`address1`,`address2`,`city`,`state`,`country`,`zipcode`,`formatted_address`) VALUES(" +
      event.customer_id + ",'" + event.name + "','" + event.address1 + "','" + event.address2 + "','" + event.city + "','" + event.state + "','" + event.country + "','" + event.zipcode + "','" + event.formattedAddr + "');";

    conn.query(queryString, function (error, results, fields) {

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
  } finally {
    conn.end();
  }
}




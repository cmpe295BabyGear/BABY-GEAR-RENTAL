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

    conn.query(`update address_details set name = '${event.name}', address1='${event.address1}', address2='${event.address2}', city='${event.city}', state='${event.state}', country='${event.country}', zipcode='${event.zipcode}', formatted_address='${event.formattedAddr}' where id=${event.id}`, function (error, results, fields) {

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




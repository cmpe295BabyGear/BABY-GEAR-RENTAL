var mysql = require('mysql');
var util = require('util');
var config = require('./config.json');

exports.handler = (event, context, callback) => {

  var conn = mysql.createConnection({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname,
  });

  context.callbackWaitsForEmptyEventLoop = false;

  console.log('event ------', event);
  try {
    const address_id = event.queryStringParameters.address_id;
    var sqlQuery = `delete from address_details where id = ${address_id} ; `;

    conn.query(sqlQuery, function (error, results, fields) {
      if (error) {
        console.log(error);
        callback(error);
        return;
      }
      else {
        console.log(results[0]);
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

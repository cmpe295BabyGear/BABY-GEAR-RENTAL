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
    const queryString = "INSERT INTO customer(`first_name`, `last_name`,`email_id`,`phone_no`,`dob`,`isSSO`) VALUES ('" + event.first_name + "', '" + event.last_name + "','" + event.email_id + "','" + event.phone_no + "' ,'" + event.dob + "','" + event.isSSO + "');";
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
  }
  finally {
    conn.end();
  }
};


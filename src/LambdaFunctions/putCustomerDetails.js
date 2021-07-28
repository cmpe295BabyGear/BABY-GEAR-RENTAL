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

    const queryString = "INSERT INTO customer(`first_name`, `last_name`,`email_id`,`phone_no`,`dob`,`isSSO`) VALUES ('" + event.first_name + "', '" + event.last_name + "','" + event.email_id + "','" + event.phone_no + "' ,'" + event.dob + "','" + event.isSSO + "');";
    var result = pool.query(queryString, function (error, results, fields) {
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
    });
    console.log(result);
    console.log(err);
    console.log(connection);
  });
};


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

    console.log('connection ----- ', connection);
    pool.query(`SELECT * FROM item_category`, function (error, results, fields) {
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




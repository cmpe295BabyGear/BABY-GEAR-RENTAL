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

    const queryString = "INSERT INTO item_category(`id`, `description`, `categoryName`) VALUES ('" + event.id + "', '" + event.categoryDescription + "', '" + event.categoryName + "' );";
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


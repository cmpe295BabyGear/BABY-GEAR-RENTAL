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

    var sqlQuery = `SELECT i.id as item_id, i.s3_label, i.rental_price, c.id as customer_id,c.email_id as email_id, item_name,i.description,baby_age,i.condition,brand,DATE_FORMAT(lease_startDT, '%m/%d/%Y') as lease_startDT, DATE_FORMAT(lease_endDT, '%m/%d/%Y') as lease_endDT, `
      + `price, availability_status,ic.categoryName, item_status, seller_preference `
      + `FROM items i `
      + `join item_category ic `
      + `on ic.id = i.item_category `
      + `join customer c `
      + `on c.id = i.customer_id `
      + `where i.id = ${event.queryStringParameters.item_id};`;

    conn.query(sqlQuery, function (error, results, fields) {
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
}




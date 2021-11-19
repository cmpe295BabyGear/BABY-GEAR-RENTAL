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

        var sqlQuery =  `SELECT  ci.id, ci.item_name, ic.categoryName as category_name, ci.description ,ci.condition, ci.brand, ci.price, ci.admin_status, ci.seller_preference, ci.baby_age,ci.rental_price, ci.s3_label, c.email_id as customer_email, i.availability_status, i.customer_item_id `+
                        `FROM customer_item ci `+
                        `join item_category ic `+
                        `on ic.id = ci.item_category `+
                        `join items i `+
                        `on ci.id = i.customer_item_id `+
                        `join customer c `+
                        `on c.id = ci.customer_id `+
                        `where ci.customer_id = ${event.queryStringParameters.customerId} && ci.s3_label != 'undefined'`;
                    
        console.log(sqlQuery)
        conn.query(sqlQuery, function (error, results, fields) {
            // connection.destroy();
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
    }catch(err){
        console.log(err);
    }
    finally{
        conn.end();
    }
}



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

    var sqlQuery = `SELECT  ci.id, ci.item_name, ic.categoryName as category_name, ci.description ,ci.condition, ci.brand, ci.price, ci.admin_status, ci.seller_preference, ci.baby_age,ci.rental_price, ci.s3_label, c.email_id as customer_email, i.availability_status, i.customer_item_id ` +
      `FROM customer_item ci ` +
      `join item_category ic ` +
      `on ic.id = ci.item_category ` +
      `join items i ` +
      `on ci.id = i.customer_item_id ` +
      `join customer c ` +
      `on c.id = ci.customer_id ` +
      `where ci.customer_id = ${event.queryStringParameters.customerId} && ci.s3_label != 'undefined'`;

    console.log(sqlQuery)
    conn.query(sqlQuery, function (error, results, fields) {
      // connection.destroy();
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




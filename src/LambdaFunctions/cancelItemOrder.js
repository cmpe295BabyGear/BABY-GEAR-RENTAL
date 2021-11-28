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

//    CREATE DEFINER = `teamjarvis`@`%` PROCEDURE`cancelItem`(orderId VARCHAR(45), itemId INT)
//     BEGIN
// DECLARE customerItemId INT;
//     --update item availability status to 1 
// 	UPDATE cmpe295.items SET
//     item_status = '',
//       availability_status = 0
// 	where id = itemId;
    
// 	select customer_item_id INTO customerItemId from cmpe295.items where id = itemId;

//     --update customer_item availability status to 1
// 	UPDATE cmpe295.customer_item SET availability_status = 0 where id = customerItemId;

//     -- delete the rent schedule table 
// 	DELETE FROM cmpe295.rent_schedule where order_id = orderId and item_id = itemId;

//     --change order status to cancelled 
// 	UPDATE cmpe295.order_details SET order_status = 'Cancelled' where order_id = orderId and item_id = itemId;
//     END


    var sqlQuery = `call cancelItem('${event.queryStringParameters.orderId}', ${event.queryStringParameters.itemId}, ${event.queryStringParameters.customerItemId}) `;
    console.log('sqlQuery....', sqlQuery)
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




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

  //   CREATE DEFINER = `teamjarvis`@`%` PROCEDURE`checkoutCart`(itemsList varchar(50), customerId INT)
  //   BEGIN
	// DECLARE ord_id int;

  //   --update the order_details of the customer
	// 	SELECT REGEXP_REPLACE(CURRENT_TIMESTAMP(), '[ :-]', '') into @ord_id;
        
        
  //       INSERT INTO cmpe295.order_details(order_id, customer_id, item_id, order_date, quantity, price, order_type, lease_startDT, lease_endDT, order_status, item_category)
	// 	SELECT @ord_id as order_id, customer_id, item_id, CURDATE(), quantity, display_price, purchase_type, rent_start_date, rent_end_date, 'pending' as orderStatus, item_category 
	// 		FROM cmpe295.cart_items ci 
  //           join customer c 
  //           on ci.customer_id = c.id
  //           where ci.customer_id = customerId;

  //   -- delete the cart items 
	// 	DELETE FROM cmpe295.cart_items where customer_id = customerId;

  //   --update the items availability
	// 	set @sql = concat("UPDATE items SET availability_status = 0, item_status = IF(seller_preference = 'RENT', 'RENTED', 'SOLD') 
	// 					  WHERE`items`.Id in (" , itemsList , ")");

	// 	PREPARE stmt FROM @sql;
	// 	EXECUTE stmt;

  //   END
    
    var sqlQuery = `call checkoutCart('${event.queryStringParameters.itemList}', ${event.queryStringParameters.customerId}) `;
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




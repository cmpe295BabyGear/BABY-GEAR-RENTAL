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
        var parameterCount = 0;
        var sqlQuery = `SELECT i.id as item_id, i.customer_id,c.email_id as email_id, i.s3_label, i.rental_price, item_name,i.description,baby_age,i.condition,brand,DATE_FORMAT(lease_startDT, '%m/%d/%Y') as lease_startDT, DATE_FORMAT(lease_endDT, '%m/%d/%Y') as lease_endDT, `
          + `price, availability_status,ic.categoryName, item_status, seller_preference, store_zipcode `
          + `FROM items i `
          + `join item_category ic `
          + `on ic.id = i.item_category `
          + `join customer c `
          + `on c.id = i.customer_id`;
          
        if (event.queryStringParameters.item_condition){
            if (parameterCount == 0){
                sqlQuery += ` where `;
            }
            parameterCount++;
            sqlQuery += `i.condition = '${event.queryStringParameters.item_condition}' `;
        }
       
        if (event.queryStringParameters.categoryName){
            if (parameterCount == 0){
                sqlQuery += ` where `;
            }
            else {
                sqlQuery += ` and `;
            }
            parameterCount++;
            sqlQuery += `ic.categoryName = '${event.queryStringParameters.categoryName}' `;
        }
        if (event.queryStringParameters.seller_preference){
            if (parameterCount == 0){
                sqlQuery += ` where `;
            }
            else {
                sqlQuery += ` and `;
            }
            parameterCount++;
            sqlQuery += `(i.seller_preference) IN ('${event.queryStringParameters.seller_preference}', 'BOTH') `;
        }
        if (event.queryStringParameters.store_zipcode){
            if (parameterCount == 0){
                sqlQuery += ` where `;
            }
            else {
                sqlQuery += ` and `;
            }
            parameterCount++;
            sqlQuery += `i.store_zipcode = '${event.queryStringParameters.store_zipcode}' `;
        }
        if (event.queryStringParameters.seller_preference === 'RENT' && event.queryStringParameters.lease_startDT && event.queryStringParameters.lease_endDT){
            if (parameterCount == 0){
                sqlQuery += ` where `;
            }
            else {
                sqlQuery += ` and `;
            }
            parameterCount++;
            sqlQuery += `i.lease_startDT <= '${event.queryStringParameters.lease_startDT}' AND i.lease_endDT >= '${event.queryStringParameters.lease_endDT}'`;
        }
        
        if (event.queryStringParameters.lowPrice){
            if (parameterCount == 0){
                sqlQuery += ` where `;
            }
            else {
                sqlQuery += ` and `;
            }
            parameterCount++;
            sqlQuery += `i.price >= ${event.queryStringParameters.lowPrice} `;
        }
        if (event.queryStringParameters.highPrice){
            if (parameterCount == 0){
                sqlQuery += ` where `;
            }
            else {
                sqlQuery += ` and `;
            }
            parameterCount++;
            sqlQuery += `i.price <= ${event.queryStringParameters.highPrice} `;
        }
        if (event.queryStringParameters.brand){
            if (parameterCount == 0){
                sqlQuery += ` where `;
            }
            else {
                sqlQuery += ` and `;
            }
            parameterCount++;
            sqlQuery += `i.brand = ${event.queryStringParameters.brand} `;
        }
        if (event.queryStringParameters.availability_status){
            if (parameterCount == 0){
                sqlQuery += ` where `;
            }
            else {
                sqlQuery += ` and `;
            }
            parameterCount++;
            sqlQuery += `i.availability_status = ${event.queryStringParameters.availability_status} `;
        }
        sqlQuery += `;`;
        
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
    }catch(err){
        console.log(err);
    }finally{
        conn.end();
    }
}

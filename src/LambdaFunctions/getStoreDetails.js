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

    try{
 
        var sqlQuery =  `SELECT zipcode, name, address ` 
                    +`FROM stores s `
                    +`where s.zipcode = ${event.queryStringParameters.zipcode};` ;
                    
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
    }
    finally{
        conn.end();
    }
}




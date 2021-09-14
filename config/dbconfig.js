
const mysql = require('mysql');

var connection;

connection = mysql.createConnection({
    host     : 'database-1.clcgtodtvdwu.us-east-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'ubereats',
    port     : '3306',
    database : 'UberEats'
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
  });


  module.exports = connection;
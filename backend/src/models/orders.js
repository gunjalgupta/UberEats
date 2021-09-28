const connection = require('../config/dbconfig');

// constructor
const Order = function (order) {
    this.customerId = order.customerId;
    this.restaurantId = order.restaurantId;
    this.ostatus = order.ostatus;
    this.total = order.total
  };

  Order.place = (cusId,resId,ostatus,total, result) => {
    console.log('in model');
    console.log('---', newOrder);
    connection.query('INSERT INTO UberEats.orders (orderId,customerId, restaurantId, total) VALUES(null, ?,?,?,?);', cusId,resId,total, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      else{
        connection.query('SELECT LAST_INSERT_ID()', (err, response) => {
            if (err) {
              console.log('error: ', err);
              result(err, null);
              return;
            }
        else{
                  console.log("orders")
                  result({'id':1})
    }    
          });
      }
      
    });
  };





exports.module= Order;

const connection = require('../config/dbconfig');

// constructor
const Order = function (order) {
    this.customerId = order.customerId;
    this.restaurantId = order.restaurantId;
    this.ostatus = order.ostatus;
    this.total = order.total
  };                

  const Orderdetails = function (orderd) {
    this.orderId = orderd.orderId;
    this.dishId = orderd.dishId;
    this.quantity = orderd.total;
    this.total = orderd.total
  };

Orderdetails.fetch= function (orderId){
    connection.query('', [orderId,dishId, quantity,total],(err,res)=>{
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
          }
  else {
    console.log("result", res);
    result(null,res);
  }
})
}


Orderdetails.place = function (dishId,orderId,quantity,total, result) {
    console.log("orderdetail")
    connection.query('INSERT INTO UberEats.orderdetails (orderdetailsId,orderId,dishId, quantity, total) VALUES(null, ?,?,?,?);', [orderId,dishId, quantity,total],(err,res)=>{
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
              }
      else {
        console.log("result", res);
        result(null,res);
      }
    })
  
  }
  exports.module= Orderdetails;
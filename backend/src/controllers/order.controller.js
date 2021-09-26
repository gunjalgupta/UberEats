const { sign } = require('jsonwebtoken');
const Order = require('../models/orders');
const Orderdetails = require('../models/orderdetails')
const connection = require('../config/dbconfig');

 exports.place = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }


}

exports.getcusorder= (req,res)=>{
    connection.query('SELECT O.*, R.*  FROM Orders O INNER JOIN Restaurant R ON O.restaurantId= R.restaurantId  WHERE O.customerId=?',req.body.customerId,(err,result)=>{
        res.send(result);
    })
}

exports.getcusorderdetails = (req,res)=>{
    connection.query('SELECT * FROM Orderdetails OD JOIN order O ON OD.invoiceId= O.invoiceId WHERE O.orderId?',req.body.orderId,(err,result)=>{
        res.send(result);
    })
}

exports.getresorderdetails = (req,res)=>{
    connection.query('SELECT * FROM Orders WHERE O.restaurantId =?',req.body.restaurantId,(err,result)=>{
        res.send(result);
    })
}

exports.addorder=(req,res)=>{
    connection.query("INSERT INTO UberEats.orders (orderId,customerId, restaurantId, ostatus, total, invoiceId) VALUES(null, ?,?,?,?,?);", [req.body.cusId,req.body.resId,req.body.ostatus,req.body.total,req.body.invoiceId],(err,response)=>{
        res.send(response);
    })
}
exports.addorderdetails=(req,res)=>{
    req.body.map((orderDetail)=>{
        console.log("order",OrderDetail);
        connection.query("INSERT INTO UberEats.orderdetails (orderdetailsId,invoiceId, dishId, quantity, price, total) VALUES(null, ?,?,?,?,?);", [req.body.invoiceId,orderDetail.dishId,orderDetail.quantity, orderDetail.price,orderDetail.total],(err,response)=>{
            res.send(response);
        })
    })
    
}

exports.updateStatus=(req,res)=>{
    connection.query("UPDATE UberEats.orders set ostatus=?",[re.body.status],(err,response)=>{
        res.send(response);
    })
}
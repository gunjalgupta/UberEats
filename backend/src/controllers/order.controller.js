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
    
    connection.query('SELECT O.*, R.*  FROM UberEats.orders O INNER JOIN UberEats.restaurant R ON O.restaurantId= R.restaurantId  WHERE O.customerId=?',req.body.customerId,(err,result)=>{
        
        
        res.send(result);
    })
}

exports.getcusorderdetails = (req,res)=>{
    console.log("body",req.body)
    connection.query('SELECT * FROM UberEats.orderdetails OD JOIN UberEats.orders O ON OD.invoiceId= O.invoiceId  WHERE O.customerId =?',req.body.customerId,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
        console.log("here",result)
        res.send(result);
        }
    })
}

exports.getresorderdetails = (req,res)=>{
    connection.query('SELECT * FROM Orders WHERE O.restaurantId =?',req.body.restaurantId,(err,result)=>{
        res.send(result);
    })
}

exports.addorder=(req,res)=>{
    console.log("order", req.body)
    connection.query("INSERT INTO UberEats.orders (orderId,customerId, restaurantId, total, invoiceId) VALUES(null, ?,?,?,?);", [req.body.customerId,req.body.restaurantId, req.body.total, req.body.invoiceId],(err,response)=>{
        res.send(response);
    })
}
exports.addorderdetails=(req,res)=>{
    console.log("detail",req.body);
    req.body.map((orderDetail)=>{
        console.log("detail2",orderDetail);
        connection.query("INSERT INTO UberEats.orderdetails (orderdetailsId,invoiceId, dishId, quantity, price, subtotal) VALUES(null, ?,?,?,?,?);", [orderDetail.invoiceId,orderDetail.dishId,orderDetail.quantity, orderDetail.Price,orderDetail.subtotal],(err,response)=>{
            console.log("detail3",response);
            res.send(response);
        })
    })
    
}

exports.updateStatus=(req,res)=>{
    connection.query("UPDATE UberEats.orders set ostatus=?",[re.body.status],(err,response)=>{
        res.send(response);
    })
}
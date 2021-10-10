
const connection = require('../config/dbconfig');
const bcrypt = require('bcryptjs')
const { sign } = require('jsonwebtoken');
const Customer = require('../models/customers.js');
const Restaurant = require('../models/restaurants.js');

exports.create = async (req, res) => {
    console.log("In controller", req.body)
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const password = req.body.pwd;
    var saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, 10)
    console.log("Request", req.body)
    // Create a Customer
    const customer = new Customer({
      email: req.body.email,
      cname: req.body.cname,
      pwd: encryptedPassword 
      
    });
    console.log("=======",customer)
    // Save Customer in the database
    Customer.create(customer, (err, data) => {
      if (err)
        {
          if (err.kind === "already exists") {
            res.status(400).send({
            message: "Account already exists"}
            );
          } else {
            res.status(500).send({
              message: "Error retrieving Customer  " 
            });
          }
        }
      else {res.send(data);}
    });
  };
//=======================================================
exports.find = async (req,res) => {
  if(!req.body){
      res.status(400).send({
          message: "Enter the values properly...!!!"
      })
  }
  //SELECT Customer
  Customer.find(req.body.email, async (err, data) => {
      console.log("emaill",req.body.email);
      console.log("pwdd",req.body.pwd);
      if(err){
        if (err.kind === "not register") {
          res.status(404).send({
            message: 'Email not found'
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with email " + req.body.email
          });
        }
      }
      // else if(!data){
      //     return res.json({
      //         success : 0,
      //         message : "Invalid email or password"
      //     })
      // }
      if (data)
      {
      const result = await bcrypt.compare(req.body.pwd, data.pwd);
      console.log("result",result);
      console.log("pwd",data.pwd);
      if(result) {
          const accessToken = sign({ id: data}, "ubereats", {
              expiresIn: 86400 //24 hours
          })
          return res.json({
              success: 1,
              message : "login successfull",
              token: accessToken,
              name: data.cname,
              customerId: data.customerId,
              email: data.email
          })
          
      } 
      else {
          return res.json({
              success : 0,
              message: "Invalid email or password"
          })
       } }
  })
}
//============================================================


  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Customer.updateById( req.body.customerId, req.body,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer .`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer "
            });
          }
        } else res.send(data);
      }
    );
  };
//============================================================================

exports.findProfile =  (req, res) => {
  if(!req.params){
    res.status(400).send({
        message: "Enter the values properly...!!!"
    })
  }
  Customer.findprofile (req.params.customerId,(err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    else res.send(data);
  });
};
//==============================================================================

exports.getRestaurants = (req, res)=>{
  console.log("in controller");
  if(!req.params){
    res.status(400).send({
        message: "Enter the values properly...!!!"
    })
  }
  Customer.getLocation(req.params.customerId, (err, address) => {
    console.log("id",req.params.customerId);
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving restaurant."
      });
    else {
      console.log("addressc1",address);
      if(address.city===null){
        Restaurant.getAllLocation(err,(err,data)=>{
          if (err)
            res.status(500).send({
              message:
                err.message || "No restaurant found at your location."
            });
          else {
            console.log("all",data);
            res.send(data);
          }
  
        })
      }
      else{
      Restaurant.getLocation(address.city, address.stateId, address.countryId, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else {
          console.log("loc",data);
          res.send(data);
        }
      });
    }
    }
  }
  )
}

//====================================================================

exports.findKey = (req, res) =>{
  console.log(req.body.customerId);
  Customer.findKey( req.body.customerId, (err,data)=>{
    if( err){
      console.log(err);
      res.status(500).send({
        message: err.message
      })
    }
    else {
      res.json({
        key: data.profilepic
      })
    }
  })
}
//=====================================================================

exports.fetchaddress =(req,res)=>{
  connection.query('SELECT * FROM UberEats.address WHERE customerId=?', req.params.customerId, (err,data)=>{
    if( err){
      console.log(err);
      res.status(500).send({
        message: err.message
      })
    }
    else {
      res.send(data);
    }
  })
}

//======================================================================

exports.addaddress =(req,res)=>{
  connection.query('INSERT INTO UberEats.address (customerId, addline1, addline2, city, state, zipcode) VALUES (?,?,?,?,?,?)', [req.body.customerId, req.body.addline1, req.body.addline2, req.body.city, req.body.state, req.body.zipcode], (err,data)=>{
    if( err){
      console.log(err);
      res.status(500).send({
        message: err.message
      })
    }
    else {
      res.send(data);
    }
  })
}
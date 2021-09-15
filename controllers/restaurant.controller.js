
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken');
const Restaurant = require('../models/restaurants.js');

exports.create = (req, res) => {
    console.log("In controller", req.body)
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const password = req.body.pwd;
    var saltRounds = 10;
    const encryptedPassword = bcrypt.hash(password, saltRounds)
    console.log("Request", req.body)
    // Create a Customer
    const restaurant = new Restaurant({
      email: req.body.email,
      rname: req.body.rname,
      pwd: encryptedPassword 
      
    });
    console.log("=======",restaurant)
    // Save Customer in the database
    Restaurant.create(restaurant, (err, data) => {
      console.log("In create");
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };
//=======================================================
exports.find = (req,res) => {
  if(!req.body){
      res.status(400).send({
          message: "Enter the values properly...!!!"
      })
  }
  //SELECT Customer
  Restaurant.find(req.body.email,  (err, data) => {
      console.log(req.body.email);
      console.log(req.body.pwd);
      if(err){
          console.log(err);
          res.status(500).send({
              message : err.message
          })
      }
      if(!data){
          return res.json({
              success : 0,
              message : "Invalid email or password"
          })
      }
      const result = bcrypt.compare(req.body.pwd, data.pwd);
      if(result) {
          const accessToken = sign({ id: data}, "ubereats", {
              expiresIn: 86400 //24 hours
          })
          return res.json({
              success: 1,
              message : "login successfull",
              token: accessToken
          })
          
      } else {
          return res.json({
              success : 0,
              message: "Invalid email or password"
          })
      }
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
  
    Restaurant.updateById(
      req.params.restaurantId,
      new Restaurant(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.restaurantId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.restaurantId
            });
          }
        } else res.send(data);
      }
    );
  };

  //===============================================================================
  exports.findProfile =  (req, res) => {
    if(!req.body){
      res.status(400).send({
          message: "Enter the values properly...!!!"
      })
    }
    Restaurant.get(req.body.restaurantId,(err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };
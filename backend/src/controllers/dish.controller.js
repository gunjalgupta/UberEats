const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken');
const Dish = require('../models/dishes');

exports.create = (req, res) => {
    console.log("In controller", req.body)
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    // Create a Customer
  
    const dish = new Dish({
        dname : req.body.dname,
        ingredients : req.body.ingredients,
        ddesc : req.body.ddesc,
        restaurantId : req.body.restaurantId,
        cuisineId : req.body.cuisineId,
        veg : req.body.veg,
        nonVeg : req.body.nonVeg,
        vegan : req.body.vegan,
        categoryId : req.body.categoryId,
        price : req.body.price
      });

    //console.log("=======",restaurant)
    // Save Customer in the database
    Dish.create(dish, (err, data) => {
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
  if(!req.params){
      res.status(400).send({
          message: "Enter the values properly...!!!"
      })
  }
  //SELECT Customer
  Dish.find(req.params.restaurantId,  (err, data) => {
    
      if(err){
      
        if (err.kind === "no dish") {
          res.status(404).send({
            message: `Not dish found .`
          });
        } else {
          res.status(500).send({
            message: "Error finding dish " 
          });
        }
      } else res.send(data);  
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
  
    Dish.updateById(
      req.params.dishId,
      new Dish(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Dish with id ${req.params.dishId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating dish with id " + req.params.dishId
            });
          }
        } else res.send(data);
      }
    );
  };

  //====================================================================

exports.findKey = (req, res) =>{
  console.log(req.body.dishId);
  Dish.findKey( req.body.dishId, (err,data)=>{
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
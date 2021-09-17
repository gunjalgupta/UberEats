
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken');
const Restaurant = require('../models/restaurants.js');
const Customer = require('../models/customers');
const Dish = require('../models/dishes');
const Cuisine = require('../models/cuisines.js');
const RCuisine = require('../models/restaurantCuisines');

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
              message: `Not found restaurant with id ${req.params.restaurantId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating restaurant with id " + req.params.restaurantId
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
  //============================================================================

 exports.searchRestaurants = (req, res)=>{
    let i=0;
    let finaldata=[];
    if(!req.body){
      res.status(400).send({
          message: "Enter the values properly...!!!"
      })
    }
    Dish.search( req.body.name, (err, ids) => {
      console.log("ids",ids);
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving customers."
        });
      if(ids.length ===0){
        Cuisine.find(req.body.name, (err, cid) => {
          console.log("cname",cid);
          if (err)
            res.status(500).send({
              message: err.message || "Some error occurred while retrieving customers."
            })
          else{
            Dish.getRId(cid, (err, rid) => {
              if (err)
                res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."})
              else{
                for(i=0;i<rid.length;i++)
                {
                  Restaurant.get(rid[i].restaurantId,(err,data)=>{
                    if (err)
                      res.status(500).send({
                      message: err.message || "Some error occurred while retrieving customers." });
                    else 
                    res.write(data);
                    finaldata[i]=data;
                    console.log("finaldata",finaldata);
          
                  } )
                }
                console.log("finaldta",finaldata);
                //res.send(finaldata)
                
              } })
            }
        })
      }
      else {
        console.log("length",ids.length);
        for(i=0;i<ids.length;i++)
          {
            Restaurant.get(ids[i].restaurantId,(err,data)=>{
            if (err)
              res.status(500).send({
              message:
              err.message || "Some error occurred while retrieving customers."
            });
            else finaldata[i]= data[0];
            console.log("finaldata",finaldata);
            console.log("data",data[0]);
            res.write(JSON.stringify(data));
  
            })
            //console.log("finaldta",finaldata);
          }
          //res.send(finaldata);
    }
  });
  res.end();
     //======

}
  
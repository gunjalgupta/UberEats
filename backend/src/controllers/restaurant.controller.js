const connection = require('../config/dbconfig');
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken');
const Restaurant = require('../models/restaurants.js');
const Customer = require('../models/customers');
const Dish = require('../models/dishes');
const Cuisine = require('../models/cuisines.js');
const RCuisine = require('../models/restaurantCuisines');

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
    const restaurant = new Restaurant({
      email: req.body.email,
      rname: req.body.rname,
      pwd: encryptedPassword 
      
    });
    console.log("=======",restaurant)
    // Save Customer in the database
    Restaurant.create(restaurant, (err, data) => {
      console.log("In create");
      if (err){
        if (err.kind === "already exists") {
          res.status(400).send({
          message: "Account already exists"}
          );
        } else {
          res.status(500).send({
            message: "Error retrieving Restaurant " 
          });
        }
      }
      else {
        res.send(restaurant);
        console.log(restaurant)
       
      }

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
  Restaurant.find(req.body.email,  async (err, data) => {
      
      if(err){
        if (err.kind === "not register") {
          res.status(404).send({
            message: 'Email not found'
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Restaurant with email " + req.body.email
          });
        }
      }
      
      if (data)
      {
      const result = await bcrypt.compare(req.body.pwd, data.pwd);

      if(result) {
      const accessToken = sign({ id: data}, "ubereats", {
          expiresIn: 86400 //24 hours
      })
      return res.json({
          success: 1,
          message : "login successfull",
          token: accessToken,
          name: data.rname,
          restaurantId: data.restaurantId,
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
  
    Restaurant.updateById(req.body.restaurantId,
      req.body,
      (err, data) => {
        console.log(res.body);
        if (err) {
          if (err.kind === "not_found") {
            res.status(400).send({
              message: `Not found restaurant.`
            });
          } else {
            res.status(500).send({
              message: "Error updating restaurant " 
            });
          }
        } else {
          res.send(data);
       
        }
      }
    );
};

  //===============================================================================
  exports.findProfile =  (req, res) => {
    if(!req.params){
      res.status(400).send({
          message: "Enter the values properly...!!!"
      })
    }
    console.log("ress",req.params.restaurantId)
    Restaurant.findprofile(req.params.restaurantId,(err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      else res.send(data);
    });
  };
  //============================================================================

//  exports.searchRestaurants = (req, res)=>{
//    console.log("search1")
//     let i=0;
//     let finaldata=[];
//     if(!req.body){
//       res.status(400).send({
//           message: "Enter the values properly...!!!"
//       })
//     }
//     Dish.search( req.body.name, async (err, ids) => {
//       console.log("ids",ids);
//       if (err)
//         res.status(500).send({
//           message: err.message || "Some error occurred while retrieving customers."
//         });
//       if(ids.length ===0){
//         Cuisine.find(req.body.name, (err, cid) => {
//           console.log("cname",cid);
//           if (err)
//             res.status(500).send({
//               message: err.message || "Some error occurred while retrieving customers."
//             })
//           else{
//             Dish.getRId(cid, (err, rid) => {
//               if (err)
//                 res.status(500).send({
//                 message: err.message || "Some error occurred while retrieving customers."})
//               else{
//                 for(i=0;i<rid.length;i++)
//                 {
//                   Restaurant.get(rid[i].restaurantId,(err,data)=>{
//                     if (err)
//                       res.status(500).send({
//                       message: err.message || "Some error occurred while retrieving customers." });
//                     else 
//                     res.write(data);
//                     finaldata[i]=data;
//                     console.log("finaldata",finaldata);
          
//                   } )
//                 }
//                 console.log("finaldta",finaldata);
//                 //res.send(finaldata)
                
//               } })
//             }
//         })
//       }
//       else {
//         console.log("length",ids.length);
//         for(i=0;i<ids.length;i++)
//           {
//             Restaurant.get(ids[i].restaurantId,(err,data)=>{
//             if (err)
//               res.status(500).send({
//               message:
//               err.message || "Some error occurred while retrieving customers."
//             });
//             else finaldata[i]= data[0];
//             console.log("finaldata",finaldata);
//             console.log("data",data[0]);
//             res.write(JSON.stringify(data));
  
//             })
//             //console.log("finaldta",finaldata);
//           }
//           //res.send(finaldata);
//     }
//   });
//   res.end();
     //======

//}
//===============================================================
exports.searchRestaurant = (req, res)=>{
 
  console.log("searc");
  console.log("reqqq",req.body);
  if(!req.body){
    res.status(400).send({
        message: "Enter the values properly...!!!"
    })
  }
  else{
    console.log(req.body)
    connection.query('SELECT restaurant.restaurantId, restaurant.rname, restaurant.pwd, restaurant.mobileNo, restaurant.city, restaurant.stateId, restaurant.countryId, restaurant.fromTime, restaurant.toTime, restaurant.rdesc, restaurant.pickup,restaurant.delivery, restaurant.veg, restaurant.nonVeg, restaurant.vegan FROM restaurant JOIN dish ON dish.restaurantId = restaurant.restaurantId WHERE dish.dname = ? UNION SELECT restaurant.restaurantId, restaurant.rname, restaurant.pwd, restaurant.mobileNo, restaurant.city, restaurant.stateId, restaurant.countryId, restaurant.fromTime, restaurant.toTime, restaurant.rdesc, restaurant.pickup, restaurant.delivery, restaurant.veg, restaurant.nonVeg, restaurant.vegan FROM restaurant JOIN dish ON dish.restaurantId = restaurant.restaurantId WHERE dish.cuisineId = (SELECT cuisineId from cuisine where cuisine.cuisineName=?) UNION SELECT restaurant.restaurantId, restaurant.rname, restaurant.pwd, restaurant.mobileNo, restaurant.city, restaurant.stateId, restaurant.countryId, restaurant.fromTime, restaurant.toTime, restaurant.rdesc, restaurant.pickup, restaurant.delivery, restaurant.veg, restaurant.nonVeg, restaurant.vegan FROM restaurant WHERE (restaurant.city = ? or restaurant.stateId= ? or restaurant.countryId= ?);', [req.body.name, req.body.name, req.body.name, req.body.name, req.body.name], (err,response) =>{
      console.log(err)
      console.log(response)
      if(err){
        res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving customers."
        })
        }
      else{
        res.send(response);
      }
    })
  } 

}
//====================================================================

exports.findKey = (req, res) =>{
  console.log("in constroller",req.body.restaurantId);
  Restaurant.findKey( req.body.restaurantId, (err,data)=>{
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
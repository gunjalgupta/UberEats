const connection = require('../config/dbconfig');

// constructor
const Restaurant = function (restaurant) {
  this.rname = restaurant.rname;
  //this.email = restaurant.email;
  this.restaurantId = restaurant.Id,
  this.pwd = restaurant.pwd;
  this.fromTime = restaurant.fromTime,
  this.toTime = restaurant.toTime,
  //this.city = restaurant.city;
  this.stateId = restaurant.stateId;
  this.countryId = restaurant.countryId;
  this.rdesc = restaurant.rdesc;
  this.mobileNo = restaurant.mobileNo;
  this.pickup = restaurant.pickup;
  this.delivery = restaurant.delivery;
  this.veg = restaurant.veg;
  this.nonVeg = restaurant.nonVeg;
  this.vegan = restaurant.vegan;
  
  if(restaurant.email){
    this.email=restaurant.email.toLowerCase();
  }
  if(restaurant.city){
    this.city=restaurant.city.toLowerCase();
  }
};

Restaurant.create = async (newRestaurant, result) => {
  console.log('in model');
  console.log('---', newRestaurant);
  await connection.query('SELECT * FROM restaurant where email=?',newRestaurant.email,(err,res)=> {
    console.log("res",res);
    if (res.length) {

    result({ kind: 'already exists' },{ message:'Email already exists' }, null);
    
    }
    else {
       connection.query('INSERT INTO restaurant SET ?', newRestaurant, (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          return;
        }
        else {
          console.log('created restaurant: ', newRestaurant);
          result(null, { newRestaurant });
        }
    }
  )
    
  }});
};
//= ========================================================

Restaurant.find = function (email, result) {
  console.log(email);
  connection.query('SELECT * FROM restaurant WHERE email = ?', email, (err, res) => {
    if (err) {
      console.log('error:', err);
      result(err, null);
    }
    if (res.length) {
      console.log('Login Successfull:', res);
      result(null, res[0]);
    } else {
      result({ kind: 'not register' }, { message:'Email doesnt exists' },null);
    }
  });
};

//= ==========================================================

Restaurant.findprofile = function (restaurantId , result) {
  console.log("res",restaurantId);
  connection.query("SELECT * FROM restaurant where restaurantId= ? ", restaurantId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    result(null, res);
    
  });
};

//============================================================

Restaurant.updateById = (restaurantId,restaurant, result) => {
  //console.log('restaurantID', restaurantId);
  console.log("in model restaurant", restaurant);
  connection.query(
    'UPDATE restaurant SET rname = ?, city=? , stateId=?, countryId=?, email =?, mobileNo=?, fromTime=?, toTime =?, rdesc=?, pickup=?, delivery =?, veg=?, nonVeg=? , vegan=? WHERE restaurantId = ?',
    // eslint-disable-next-line max-len
    [restaurant.values.rname,  restaurant.values.city, restaurant.values.stateId, restaurant.values.countryId, restaurant.values.email, restaurant.values.mobileNo, restaurant.values.fromTime, restaurant.values.toTime, restaurant.values.rdesc, restaurant.values.pickup, restaurant.values.delivery, restaurant.values.veg, restaurant.values.nonVeg, restaurant.values.vegan, restaurantId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      const newLocal = res.affectedRows === 0;
      if (newLocal) {
        // not found Restaurant with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated restaurant: ', { restaurant });
      console.log('updated restaurant: ', { res });
      result(null, restaurant );
    },
  );
};
//=================================================================

Restaurant.getLocation = function (city, stateId, countryId , result) {

  connection.query("SELECT * FROM restaurant where city= ? and stateId= ? and countryId=?", 
  [city, stateId, countryId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("restaurants: ", res);
    result(null, res);
  });
};

//================================================================
Restaurant.getAllLocation = function (err, result) {
  
  connection.query("SELECT * FROM restaurant", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("restaurants: ", res);
    result(null, res);
  });
};

//==================================================================

Restaurant.findKey = function (restaurantId, result){
  console.log("in key",restaurantId);
  connection.query ("SELECT profilepic FROM restaurant WHERE restaurantId= ?",restaurantId, (err, res) =>{
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else{
      console.log("result", res[0]);
      result(null, res[0]);
    }
  })
}

//===================================================================

Restaurant.addpicture = function (restaurantId, key, result) {
  console.log("model",key);
  connection.query(" UPDATE restaurant SET profilepic =? WHERE restaurantId = ?",[key,restaurantId], (err,res) =>{
    if(err){
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else {
      console.log("result", res);
      result(null,res);
    }
  })
}

module.exports = Restaurant;

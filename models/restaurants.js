const connection = require('../config/dbconfig');

console.log('In db');
// constructor
const Restaurant = function (restaurant) {
  this.rname = restaurant.rname;
  this.email = restaurant.email;
  this.pwd = restaurant.pwd;
  this.timings = restaurant.timings;
  this.city = restaurant.city;
  this.state = restaurant.state;
  this.country = restaurant.country;
  this.rdesc = restaurant.rdesc;
  this.mobileNo = restaurant.mobileNo;
  this.pickup = restaurant.pickup;
  this.delivery = restaurant.delivery;
  this.veg = restaurant.veg;
  this.nonVeg = restaurant.nonVeg;
  this.vegan = restaurant.vegan;
};

Restaurant.create = (newRestaurant, result) => {
  console.log('in model');
  connection.query('INSERT INTO restaurant SET ?', newRestaurant, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('Restaurant created: ', { id: res.insertId, ...newRestaurant });
    result(null, { id: res.insertId, ...newRestaurant });
  });
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
      console.log('Restaurant not found', res);
      result({ kind: 'not register' }, null);
    }
  });
};
//= ==========================================================

Restaurant.get = function (restaurantId , result) {
  connection.query("SELECT * FROM restaurant where restaurantId= ?", restaurantId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("profile: ", res);
    result(null, res);
  });
};

//============================================================

Restaurant.updateById = (restaurantId, restaurant, result) => {
  console.log('restaurantID', restaurantId);
  console.log("in model restaurant", restaurant);
  connection.query(
    'UPDATE restaurant SET rname = ?, city=? , state=?, country=?, email =?, mobileNo=?, timings=?, rdesc=?, pickup=?, delivery =?, veg=?, nonVeg=? , vegan=? WHERE restaurantId = ?',
    // eslint-disable-next-line max-len
    [restaurant.rname,  restaurant.city, restaurant.state, restaurant.country, restaurant.email, restaurant.mobileNo, restaurant.timings, restaurant.rdesc, restaurant.pickup, restaurant.delivery, restaurant.veg, restaurant.nonVeg, restaurant.vegan, restaurantId],
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

      console.log('updated restaurant: ', { restaurantId, ...restaurant });
      result(null, { restaurantId, ...restaurant });
    },
  );
};

module.exports = Restaurant;

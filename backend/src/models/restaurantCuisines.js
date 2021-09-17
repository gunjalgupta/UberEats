const connection = require('../config/dbconfig');

const RCuisine= function(rcuisine){
    this.cuisineId = cuisine.cuisineId;
    this.restaurantId = cuisine.restaurantId ;
}

RCuisine.find = function (id, result) {
    
    connection.query('SELECT restaurantId FROM restaurantCuisine WHERE cuisineId = ?', id, (err, res) => {
      if (err) {
        console.log('error:', err);
        result(err, null);
      }
      result(null, res);
    });
  };

  module.exports = RCuisine;
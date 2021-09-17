const connection = require('../config/dbconfig');

const Cuisine= function(cuisine){
    this.cuisineId = cuisine.cuisineId;
    this.cuisineName= cuisine.cuisineName;
}

Cuisine.find = function (name, result) {
    
    connection.query('SELECT cuisineId FROM cuisine WHERE cuisineName = ?', name, (err, res) => {
      if (err) {
        console.log('error:', err);
        result(err, null);
      }
      result(null, res);
    });
  };

  module.exports = Cuisine;
const connection = require('../config/dbconfig');

console.log('In db');
// constructor
const Dish = function (dish) {
  this.dname = dish.dname;
  this.ingredients = dish.ingredients;
  this.ddesc = dish.ddesc;
  this.restaurantId = dish.restaurantId;
  this.cuisineId = dish.cuisineId;
  this.veg = dish.veg;
  this.nonVeg = dish.nonVeg;
  this.vegan = dish.vegan;
  this.categoryId = dish.categoryId;
  this.price= dish.price;
};

Dish.create = (newDish, result) => {
  console.log('in model');
  console.log('---', newDish);
  connection.query('INSERT INTO dish SET ?', newDish, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('Dish added: ', { id: res.insertId, ...newDish });
    result(null, { id: res.insertId, ...newDish});
  });
};
//= ========================================================

Dish.find = function (restaurantId, result) {
  
  connection.query('SELECT d.dishId, d.dname, d.ingredients, d.ddesc, d.restaurantId, d.cuisineId, c.cuisineName, d.veg, d.nonVeg, d.vegan, d.categoryId, d.Price FROM dish d join cuisine c ON d.cuisineId = c.cuisineId WHERE restaurantId = ?' , restaurantId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("dishes: ", res);
    result(null, res);
  
  });
};
//= ==========================================================

Dish.updateById = (dishId, dish, result) => {
  
  connection.query(
    'UPDATE dish SET dname = ?, ingredients = ? , ddesc=? , restaurantId =?, cuisineId =?, veg =?, nonVeg =?, vegan=?, categoryId =?, price =? WHERE dishId = ?',
    // eslint-disable-next-line max-len
    [dish.dname, dish.ingredients, dish.ddesc, dish.restaurantId, dish.cuisineId, dish.veg, dish.nonVeg, dish.vegan, dish.categoryId, dish.price, dishId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      const newLocal = res.affectedRows === 0;
      if (newLocal) {
        // not found Customer with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      //console.log('updated customer: ', { customerId, ...customer });
      result(null, { dishId, ...dish });
    },
  );
};
//=======================================================
Dish.search = function (dname, result) {
  
  connection.query('SELECT DISTINCT restaurantId FROM dish WHERE dname = ?', dname, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("dishes: ", res);
    result(null, res);
  
  });
};
//====================================================

Dish.getRId = function (cuisineId, result) {
  
  connection.query('SELECT DISTINCT restaurantId FROM dish WHERE cuisineId = ?', cuisineId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("RID: ", res);
    result(null, res);
  
  });
};

//====================================================================

Dish.findKey = function (dishId, result){
  console.log("in key",dishId);
  connection.query ("SELECT profilepic FROM dish WHERE dishId= ?",dishId, (err, res) =>{
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

Dish.addpicture = function (dishId, key, result) {
  console.log("model",key);
  connection.query(" UPDATE dish SET profilepic =? WHERE dishId = ?",[key,dishId], (err,res) =>{
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

module.exports = Dish;


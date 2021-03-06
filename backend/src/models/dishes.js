const connection = require('../config/dbconfig');

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
  this.Price= dish.Price;
  this.profilepic= dish.profilepic;
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
  console.log("in find",restaurantId)
  connection.query('SELECT d.dishId, d.dname, d.ingredients, d.ddesc, d.restaurantId, d.cuisineId, c.cuisineName, d.veg, d.nonVeg, d.vegan, d.categoryId, d.Price, d.profilepic FROM dish d join cuisine c ON d.cuisineId = c.cuisineId WHERE restaurantId = ?' , restaurantId, (err, res) => {
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

  console.log("here",dish.values, dishId)
  console.log("here",dish.values.dname, dishId)
  console.log("here",dish.values.ingredients, dishId)
  
  connection.query(
    'UPDATE dish SET dname = ?, ingredients = ? , ddesc=? , restaurantId =?, cuisineId =?, veg =?, nonVeg =?, vegan=?, categoryId =?, Price =? WHERE dishId = ?',
    // eslint-disable-next-line max-len
    [dish.values.dname, dish.values.ingredients, dish.values.ddesc, dish.values.restaurantId, dish.values.cuisineId, dish.values.veg, dish.values.nonVeg, dish.values.vegan, dish.values.categoryId, dish.values.Price, dishId],
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
      console.log(dish.values);
      console.log("data",res)
      //console.log('updated customer: ', { customerId, ...customer });
      result(null, dish );
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

//====================================================

Dish.getId = function (dishId, result) {
  
  connection.query('SELECT * FROM dish WHERE dishId = ?', dishId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ID: ", res);
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
//==========================================================================

Dish.deletedish = function (dishId, result) {
  console.log("dishId", dishId);
  connection.query(" DELETE FROM dish WHERE dishId = ?", dishId , (err,res) => {
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


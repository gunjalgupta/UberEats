module.exports = (app) => {
    // eslint-disable-next-line global-require
    const Restaurant = require('../controllers/restaurant.controller');
    const Dish = require('../controllers/dish.controller');

    console.log('In router');
    app.post("/restaurant/register", Restaurant.create);

    app.post("/restaurant/login", Restaurant.find);
  
    // Update a Customer with customerId
    app.post('/restaurant/updatedetails/', Restaurant.update);
  
    app.post('/restaurant/updatecontact/:restaurantId', Restaurant.update);

    app.post('/restaurant/adddish',Dish.create);

    app.post('/restaurant/editdish/:dishId',Dish.update);

    app.post('/dish/key', Dish.findKey);

    app.post('/restaurant/getdish/:restaurantId',Dish.find);

    app.post('/restaurant/profile/:restaurantId',Restaurant.findProfile);

    app.post("/restaurant/key", Restaurant.findKey);

    app.post("/restaurant/getd/:dishId", Dish.getid);

    app.post('/restaurant/deletedish/:dishId', Dish.deletedish);

    app.post("/customer/addfav", Restaurant.addfav);

    app.post("/customer/deletefav/", Restaurant.deletefav);

    app.post("/customer/showfav/:customerId", Restaurant.showfav);

    app.post("/customer/checkfav", Restaurant.checkfav);

  };
  
  
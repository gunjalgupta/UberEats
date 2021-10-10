module.exports = (app) => {
    // eslint-disable-next-line global-require
    const Restaurant = require('../controllers/restaurant.controller');
    const Dish = require('../controllers/dish.controller');

    console.log('In router');
    app.post("/api/restaurant/register", Restaurant.create);

    app.post("/api/restaurant/login", Restaurant.find);
  
    // Update a Customer with customerId
    app.post('/api/restaurant/updatedetails/', Restaurant.update);
  
    app.post('/api/restaurant/updatecontact/:restaurantId', Restaurant.update);

    app.post('/api/restaurant/adddish',Dish.create);

    app.post('/api/restaurant/editdish/:dishId',Dish.update);

    app.post('/api/dish/key', Dish.findKey);

    app.post('/api/restaurant/getdish/:restaurantId',Dish.find);

    app.post('/api/restaurant/profile/:restaurantId',Restaurant.findProfile);

    app.post("/api/restaurant/key", Restaurant.findKey);

    app.post("/api/restaurant/getd/:dishId", Dish.getid);

    app.post('/api/restaurant/deletedish/:dishId', Dish.deletedish);

    app.post("/api/customer/addfav", Restaurant.addfav);

    app.post("/api/customer/deletefav/", Restaurant.deletefav);

    app.post("/api/customer/showfav/:customerId", Restaurant.showfav);

    app.post("/api/customer/checkfav", Restaurant.checkfav);

  };
  
  
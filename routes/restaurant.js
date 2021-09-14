module.exports = (app) => {
    // eslint-disable-next-line global-require
    const Restaurant = require('../controllers/restaurant.controller');
    console.log('In router');
    app.post("/restaurant/register", Restaurant.create);
  
    // Update a Customer with customerId
    app.post('/restaurant/updatedetails/:restaurantId', Restaurant.update);
  
    app.post('/restaurant/updatecontact/:restaurantId', Restaurant.update);
  };
  
  
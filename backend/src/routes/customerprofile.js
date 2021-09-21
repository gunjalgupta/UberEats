
module.exports = (app) => {
  // eslint-disable-next-line global-require
  const Restaurant = require('../controllers/restaurant.controller');

  const Customer = require('../controllers/customer.controller');
  const express = require('express');
  const router= express.Router();

  // Update a Customer with customerId
  app.post('/customerprofile/updatedetails/', Customer.update);

  app.post('/customerprofile/updatecontact/:customerId', Customer.update);

  app.get('/customerprofile/:customerId',Customer.findProfile);

  app.get('/customerprofile/getRestaurants/:customerId', Customer.getRestaurants);

  app.post('/customerprofile/searchRestaurant', Restaurant.searchRestaurant);



 };



module.exports = (app) => {
  // eslint-disable-next-line global-require
  const Restaurant = require('../controllers/restaurant.controller');

  const Customer = require('../controllers/customer.controller');
  const express = require('express');
  const router= express.Router();

  // Update a Customer with customerId
  app.post('/api/customerprofile/updatedetails/', Customer.update);

  app.post('/api/customerprofile/updatecontact/:customerId', Customer.update);

  app.get('/api/customerprofile/:customerId',Customer.findProfile);

  app.get('/api/customerprofile/getRestaurants/:customerId', Customer.getRestaurants);

  app.post('/api/customerprofile/searchRestaurant', Restaurant.searchRestaurant);



 };


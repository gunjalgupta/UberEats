module.exports = (app) => {
  // eslint-disable-next-line global-require
  const Customer = require('../controllers/customer.controller');
  console.log('In router');
  app.post("/customerprofile/register", Customer.create);

  // Update a Customer with customerId
  app.post('/customerprofile/updatedetails/:customerId', Customer.update);

  app.post('/customerprofile/updatecontact/:customerId', Customer.update);
};


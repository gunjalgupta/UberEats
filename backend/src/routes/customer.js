const Restaurant = require('../controllers/restaurant.controller');
const Customer = require('../controllers/customer.controller');

module.exports = (app) => {
    
    console.log('In router');
    app.post("/customer/register", Customer.create);
  
    app.post("/customer/login", Customer.find);

    app.post("/key", Customer.findKey);

    app.post("/customer/fetchaddress/:customerId", Customer.fetchaddress);

    app.post("/customer/addaddress", Customer.addaddress);
 
};
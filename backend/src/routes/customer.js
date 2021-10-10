const Restaurant = require('../controllers/restaurant.controller');
const Customer = require('../controllers/customer.controller');

module.exports = (app) => {
    
    console.log('In router');
    app.post("/api/customer/register", Customer.create);
  
    app.post("/api/customer/login", Customer.find);

    app.post("/api/key", Customer.findKey);

    app.post("/api/customer/fetchaddress/:customerId", Customer.fetchaddress);

    app.post("/api/customer/addaddress", Customer.addaddress);
 
};
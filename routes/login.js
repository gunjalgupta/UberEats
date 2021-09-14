module.exports = app => {
    const customer = require('../controller/customer.controller.js')

const { checkToken } = require('../middleware/auth.js')
    
//CREATE a new Customer 
app.post("/register", checkToken, customer.create);

//login 
app.post("/login", customer.find);

//get users
app.get("/inside", checkToken, customer.findAll);
};
module.exports = app => {
    const Customer = require("../controllers/customer.controller.js");
    console.log("In router")
    //app.post("/register", Customer.create);

    // Update a Customer with customerId
    app.post("/updatedetails/:customerId", Customer.update);

    app.post("/updatecontact/:customerId", Customer.update);

}
module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
    console.log("In router")
app.post("/customers", customers.create);

}
const sql = require("db.js");
console.log("In db")
// constructor
const Customer = function(customer) {
  this.email = customer.email;
  this.name = customer.cname;
  this.pwd = customer.pwd;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

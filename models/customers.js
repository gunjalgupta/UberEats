const connection = require('../config/dbconfig');

console.log('In db');
// constructor
const Customer = function (customer) {
  this.cname = customer.cname;
  this.email = customer.email;
  this.pwd = customer.pwd;
  this.DOB = customer.DOB;
  this.city = customer.city;
  this.stateID = customer.stateId;
  this.countryId = customer.countryId;
  this.nickname = customer.nickname;
  this.mobileNo = customer.mobileNo;
};

Customer.create = (newCustomer, result) => {
  console.log('in model');
  console.log('---', newCustomer);
  connection.query('INSERT INTO customer SET ?', newCustomer, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created customer: ', { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};
//= ========================================================

Customer.find = function (email, result) {
  console.log(email);
  connection.query('SELECT * FROM customer WHERE email = ?', email, (err, res) => {
    if (err) {
      console.log('error:', err);
      result(err, null);
    }
    if (res.length) {
      console.log('Login Successfull:', res);
      result(null, res[0]);
    } else {
      console.log('db mein kuch hai hi nai', res);
      result({ kind: 'not register' }, null);
    }
  });
};
//= ==========================================================

Customer.updateById = (customerId, customer, result) => {
  console.log('customerID', customerId);
  connection.query(
    'UPDATE customer SET cname = ?, DOB = ? , city=? , stateId=?, countryID=?, nickname=?, email =?, mobileNo=? WHERE customerId = ?',
    // eslint-disable-next-line max-len
    [customer.cname, customer.DOB, customer.city, customer.stateId, customer.countryID, customer.nickname, customer.email, customer.mobileNo, customerId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      const newLocal = res.affectedRows === 0;
      if (newLocal) {
        // not found Customer with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated customer: ', { customerId, ...customer });
      result(null, { customerId, ...customer });
    },
  );
};

//====================================================================

Customer.get = function (customerId , result) {
  connection.query("SELECT * FROM customer where customerId= ?", customerId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("profile: ", res);
    result(null, res);
  });
};

module.exports = Customer;


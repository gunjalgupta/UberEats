const connection = require('../config/dbconfig');


//constructor
const Customer = function (customer) {
  this.pwd = customer.pwd;
  this.DOB = customer.DOB;
  this.stateId = customer.stateId;
  this.countryId = customer.countryId;
  this.nickname = customer.nickname;
  this.mobileNo = customer.mobileNo;
  this.about= customer.about;
  if(customer.cname){
    this.cname=customer.cname.toLowerCase();
  }else
  this.cname=customer.cname
  if(customer.email){
    this.email=customer.email.toLowerCase();
  }
  if(customer.city){
    this.city=customer.city.toLowerCase();
  }
};
// if(Customer.cname){
//   Customer.cname=Customer.cname.toLowerCase();
// }
// if(Customer.email){
//   Customer.email=Customer.email.toLowerCase();
// }
// if(Customer.city){
//   Customer.city=Customer.city.toLowerCase();
// }
Customer.create = async (newCustomer, result) => {
  console.log('in model');
  console.log('---', newCustomer);
  try{
  await connection.query('SELECT * FROM customer where email=?',newCustomer.email,(err,res)=> {
    console.log("res",res);
    if (res.length) {

    result({ kind: 'already exists' },{ message:'Email already exists' }, null);
    
    }
    else {
       connection.query('INSERT INTO customer SET ?', newCustomer, (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          return;
        }
        else {
          console.log('created customer: ');
          result(null, { newCustomer });
        }
    }
  )
    
  }});}
  catch(error){console.log(error)}
};
//= ========================================================

Customer.find = function (email, result) {
  console.log(email);
  try{
  connection.query('SELECT * FROM customer WHERE email = ?', email, (err, res) => {
    if (err) {
      console.log('error:', err);
      result(err, null);
    }
    if (res.length) {
      console.log('Login Successfull:', res[0][0]);
      result(null, res[0]);
    } else {
      console.log(res)
      result({ kind: 'not register' }, { message:'Email doesnt exists' },null);
    }
  });}
  catch(error){console.log(error)}
};
//= ==========================================================

Customer.updateById = (customerId, customer, result) => {
  console.log('customerID', customerId);
  connection.query(
    'UPDATE customer SET cname = ?, DOB = ? , city=? , stateId=?, countryId=?, nickname=?, email =?, mobileNo=?, about= ? WHERE customerId = ?',
    // eslint-disable-next-line max-len
    [customer.values.cname, customer.values.DOB, customer.values.city, customer.values.stateId, customer.values.countryId, customer.values.nickname, customer.values.email, customer.values.mobileNo, customer.values.about ,customerId],
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

Customer.findprofile = function (customerId , result) {
  connection.query('SELECT * FROM customer where customerId= ?', customerId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("profile: ", res);
    result(null, res);
  });
};
//==============================================================

Customer.getLocation = function (customerId, address){
  
  connection.query('SELECT city, stateId, countryId FROM customer where customerId= ?', customerId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      address(null, err);
      return;
    }
    address(null, res[0]);
  });
   
}
//====================================================================

Customer.findKey = function (customerId, result){
  console.log("in key",customerId);
  connection.query ("SELECT profilepic FROM customer WHERE customerId= ?",customerId, (err, res) =>{
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else{
      console.log("result", res[0]);
      result(null, res[0]);
    }
  })
}

//===================================================================

Customer.addpicture = function (customerId, key, result) {
  console.log("model",key);
  connection.query(" UPDATE customer SET profilepic =? WHERE customerId = ?",[key,customerId], (err,res) =>{
    if(err){
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else {
      console.log("result", res);
      result(null,res);
    }
  })
}

module.exports = Customer;


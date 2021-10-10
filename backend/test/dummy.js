process.env.NODE_ENV = 'test';

const assert = require("chai").assert;
const index = require("../index");
const chai = require("chai");
chai.use(require("chai-http"));
const expect = require("chai").expect;
const agent = require("chai").request.agent(index);


describe("Splitwise Backend Testing", function (){


    describe("Login Test", function () {
        it("Incorrect Password", (done) => {
          agent
            .post("/customer/login")
            .send({ email: "gunjal1gupta@gmail.com", password: "123" })
            .then(function (res) {
              expect(res.data.success).to.equal(0);
            })
            .catch((error) => {
              console.log(error);
            });
            done();
        })
  
        it("Correct Password", (done)=>{
            agent
                .post("/customer/login")
                .send({email: "gunjal1gupta@gmail.com" , password: "1234"})
                .then(function (res){
                    expect(res.status).to.eql(200);
                    expect(res.data.success).to.equal(1);
                })
                .catch((error) =>{
                    console.log(error);
                });
                done();
        })
    });
    
    describe("Signup Test", function () {
        it("same email", (done) => {
          agent
            .post("/customer/register")
            .send({name:"12345", email: "gunjal1gupta@gmail.com", password: "" })
            .then(function (res) {
            expect(res.status).to.eql(400);
              expect(res.body.message).to.equal('Account already exists');
            })
            .catch((error) => {
              console.log(error);
            });
            done();
        })


        it("successful", (done) => {
            agent
              .post("/customer/register")
              .send({name:"12345", email: "gunjal2gupta@gmail.com", cname:"gunjal", password: "1234" })
              .then(function (res) {
                expect(res.status).to.eql(200);
                expect(res.body.newCustomer.email).to.equal("gunjal2gupta@gmail.com");
              })
              .catch((error) => {
                console.log(error);
              });
              done();
          })
    
    });
    describe("Check fav", function () {
        it("success", (done) => {
          agent
            .post("/customer/checkfav")
            .send({
                "restaurantId":2,
                "customerId": 5  
            })
            .then(function (res) {
            expect(res.status).to.eql(200);
              expect(res.text).to.equal('success')
            })
            .catch((error) => {
              console.log(error);
            });
            done();
        })
    })

    describe("Add fav", function () {
        it("success", (done) => {
          agent
            .post("/customer/addfav")
            .send({
                "restaurantId":2,
                "customerId": 5  
            })
            .then(function (res) {
            expect(res.status).to.eql(200);
            expect(res.body.affectedRows).to.equal(1)
            })
            .catch((error) => {
              console.log(error);
            });
            done();
        })
    })

    describe("Get dish", function () {
        it("success", (done) => {
          agent
            .post("/restaurant/getd/12")
            
            .then(function (res) {
            expect(res.status).to.eql(200);
            expect(res.body[0].dishId).to.equal(12)
            })
            .catch((error) => {
              console.log(error);
            });
            done();
        })
    })
 
   
    

});
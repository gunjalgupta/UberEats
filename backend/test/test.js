const request = require("supertest")("http;//localhost:8081/customer/login");
const expect = require("chai").expect;
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index").server;
let customer = require('../src/models/customers');


chai.should();
chai.use(chaiHttp);

describe("POST /login", function () {
  it("returns if customer has account", function () {
    let customer = {
        email: "gunjal1gupta@gmail.com",
        pwd: "1234"
    }
    chai.request(server)
            .post('/customer/login')
    .send(customer).end( res => {
        console.log(res)
        res.should.have.status(200);
        // res.body.should.be.a('object');
        // res.body.should.have.property('errors');
        // res.body.errors.should.have.property('pages');
        // res.body.errors.pages.should.have.property('kind').eql('required');
    done();
  });;

    // expect(response.status).to.eql(200);
    // expect(response.body.data.success).to.eql(1);
  });
});


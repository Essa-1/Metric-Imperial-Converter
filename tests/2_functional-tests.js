const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const assert = chai.assert;

chai.use(chaiHttp);

suite("Functional Tests", function () {
  
  test("Convert a valid input", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        done();
      });
  });

  test("Convert an invalid unit", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.body.error, "invalid unit");
        done();
      });
  });

  test("Convert an invalid number", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.body.error, "invalid number");
        done();
      });
  });

  test("Convert an invalid number AND unit", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(res.body.error, "invalid number and unit");
        done();
      });
  });

  test("Convert with no number", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        done();
      });
  });
});

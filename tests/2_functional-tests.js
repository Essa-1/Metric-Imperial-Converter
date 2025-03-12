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
        done();
      });
  });

  test("Convert an invalid unit", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10g")
      .end(function (err, res) {
        assert.equal(res.body.error, "invalid unit");
        done();
      });
  });
});

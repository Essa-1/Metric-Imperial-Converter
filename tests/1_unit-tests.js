const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Correctly read whole number input", function () {
    assert.equal(convertHandler.getNum("5km"), 5);
  });

  test("Correctly read decimal number input", function () {
    assert.equal(convertHandler.getNum("2.5mi"), 2.5);
  });

  test("Correctly read fractional input", function () {
    assert.equal(convertHandler.getNum("1/2gal"), 0.5);
  });

  test("Correctly read fractional input with a decimal", function () {
    assert.equal(convertHandler.getNum("2.5/5kg"), 0.5);
  });

  test("Return error on double-fraction", function () {
    assert.isNull(convertHandler.getNum("3/2/3lbs"));
  });

  test("Default to 1 when no numerical input provided", function () {
    assert.equal(convertHandler.getNum("kg"), 1);
  });

  test("Correctly read each valid input unit", function () {
    assert.equal(convertHandler.getUnit("5km"), "km");
  });

  test("Return error for invalid input unit", function () {
    assert.isNull(convertHandler.getUnit("5kilomegagram"));
  });

  test("Return correct return unit", function () {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
  });

  test("Correctly convert gal to L", function () {
    assert.equal(convertHandler.convert(1, "gal"), 3.78541);
  });

  test("Correctly convert L to gal", function () {
    assert.equal(convertHandler.convert(1, "L"), 0.26417);
  });

  test("Correctly convert mi to km", function () {
    assert.equal(convertHandler.convert(1, "mi"), 1.60934);
  });

  test("Correctly convert km to mi", function () {
    assert.equal(convertHandler.convert(1, "km"), 0.62137);
  });

  test("Correctly convert lbs to kg", function () {
    assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
  });

  test("Correctly convert kg to lbs", function () {
    assert.equal(convertHandler.convert(1, "kg"), 2.20462);
  });
});

function ConvertHandler() {
  this.units = {
    gal: { returnUnit: "L", factor: 3.78541 },
    L: { returnUnit: "gal", factor: 1 / 3.78541 },
    mi: { returnUnit: "km", factor: 1.60934 },
    km: { returnUnit: "mi", factor: 1 / 1.60934 },
    lbs: { returnUnit: "kg", factor: 0.453592 },
    kg: { returnUnit: "lbs", factor: 1 / 0.453592 },
  };

  this.getNum = function (input) {
    let result = input.match(/^[\d./]+/);
    if (!result) return 1;

    try {
      return eval(result[0]);
    } catch {
      return null;
    }
  };

  this.getUnit = function (input) {
    let result = input.match(/[a-zA-Z]+$/);
    if (!result) return null;

    let unit = result[0].toLowerCase();
    if (unit === "l") unit = "L";
    return this.units[unit] ? unit : null;
  };

  this.getReturnUnit = function (initUnit) {
    return this.units[initUnit]?.returnUnit || null;
  };

  this.spellOutUnit = function (unit) {
    const fullNames = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
    return fullNames[unit] || "unknown";
  };

  this.convert = function (initNum, initUnit) {
    return parseFloat((initNum * this.units[initUnit].factor).toFixed(5));
  };
}

module.exports = ConvertHandler;

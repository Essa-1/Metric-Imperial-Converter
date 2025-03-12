const express = require("express");
const ConvertHandler = require("../controllers/convertHandler");

const router = express.Router();
const convertHandler = new ConvertHandler();

router.get("/convert", (req, res) => {
  const input = req.query.input;
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  if (!initNum && !initUnit) {
    return res.json({ error: "invalid number and unit" });
  }
  if (!initNum) {
    return res.json({ error: "invalid number" });
  }
  if (!initUnit) {
    return res.json({ error: "invalid unit" });
  }

  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const spelledInitUnit = convertHandler.spellOutUnit(initUnit);
  const spelledReturnUnit = convertHandler.spellOutUnit(returnUnit);

  res.json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string: `${initNum} ${spelledInitUnit} converts to ${returnNum} ${spelledReturnUnit}`,
  });
});

module.exports = router;

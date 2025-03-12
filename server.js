const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Conversion logic
const conversionRates = {
  mi: {
    factor: 1.60934,
    unit: "km",
    fullName: "miles",
    returnFullName: "kilometers",
  },
  km: {
    factor: 0.621371,
    unit: "mi",
    fullName: "kilometers",
    returnFullName: "miles",
  },
};

app.get("/api/convert", (req, res) => {
  const input = req.query.input;

  if (!input) {
    return res.json({ error: "No input provided" });
  }

  const match = input.match(/^([\d.]+)(mi|km)$/);
  if (!match) {
    return res.json({ error: "Invalid input format" });
  }

  const [, numStr, unit] = match;
  const num = parseFloat(numStr);

  if (isNaN(num) || !conversionRates[unit]) {
    return res.json({ error: "Invalid number or unit" });
  }

  const {
    factor,
    unit: returnUnit,
    fullName,
    returnFullName,
  } = conversionRates[unit];
  const convertedNum = parseFloat((num * factor).toFixed(5));
  const resultString = `${num} ${fullName} converts to ${convertedNum} ${returnFullName}`;

  res.json({
    initNum: num,
    initUnit: unit,
    returnNum: convertedNum,
    returnUnit: returnUnit,
    string: resultString,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

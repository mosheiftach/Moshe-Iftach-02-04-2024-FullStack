const express = require("express");
const bodyParser = require("body-parser");
const {
  getForecast,
  getCurrentCondition,
  getAutocomplete,
} = require("./AccuweatherApis/apis");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/api/getForecast", async (req, res) => {
  const tempRes = await getForecast(req.query.key);
  res.json(tempRes);
});

app.get("/api/getCurrentCondition", async (req, res) => {
  const tempRes = await getCurrentCondition(req.query.key);
  res.json(tempRes);
});

app.get("/api/getAutocomplete", async (req, res) => {
  const tempRes = await getAutocomplete(req.query.searchedString);
  res.json(tempRes);
});
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

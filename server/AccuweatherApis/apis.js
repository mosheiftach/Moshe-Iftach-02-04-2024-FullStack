const axios = require("axios");
const getForecast = async (key) => {
  try {
    const response = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=s9LG1iE1JYDKGH9A5AeujArIo8xOyqjR&details=true&metric=true`
    );
    return response.data;
  } catch (err) {
    console.log("Could not fetch data");
  }
};

const getCurrentCondition = async (key) => {
  try {
    const response = await axios.get(
      `https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=s9LG1iE1JYDKGH9A5AeujArIo8xOyqjR&details=true&metric=true`
    );
    return response.data;
  } catch (err) {
    console.log("Could not fetch data");
  }
};

const getAutocomplete = async (key) => {
  try {
    const response = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=s9LG1iE1JYDKGH9A5AeujArIo8xOyqjR&q=${key}&language=en-us`
    );

    return response.data; // Return the JSON data directly
  } catch (err) {
    console.log("Could not fetch data");
    throw err; // Rethrow the error for the caller to handle
  }
};

module.exports = { getForecast, getCurrentCondition, getAutocomplete };

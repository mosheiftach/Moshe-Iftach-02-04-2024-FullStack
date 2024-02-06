import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import {
  getAutocomplete,
  getCurrentCondition,
  getForecast,
} from "../helpers/Api";
import { addFavorite, deleteOneFavorite } from "../store/action/StoreActions";
import { DynamicHeader } from "../style/dynamicHeader";
import "../style/MainPage.css";
import Dropdown from "./DropDown";
import { FavoritePage } from "./FavoritePage";
import { NavBar } from "./NavigationBar";
import { WeeklyWeather } from "./WeeklyWeather";

const MainPage = () => {
  const [locationApi, setLocationApi] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherForcast, setWeatherForcast] = useState([]);
  const [selectedDay, setSelectedDay] = useState("0");
  const [searchedItem, setSearchedItem] = useState("");
  const [codeHolder, setCodeHolder] = useState("");
  const [todayForecast, setTodayForecast] = useState([]);
  const dispatch = useDispatch();
  const favoCodes = useSelector((state) => state.favorites);

  useEffect(() => {
    const getLocations = async () => {
      const locations = await getAutocomplete(searchedItem);
      const cityCountry = [];
      for (let location of locations) {
        let label = location.LocalizedName;
        let value = location.Country.LocalizedName;
        let code = location.Key;
        cityCountry.push({ label, value, code });
      }
      setLocationApi(cityCountry);
    };
    if (searchedItem === "") {
      setLocationApi([]);
    } else {
      getLocations();
    }
  }, [searchedItem]);

  const getForcast = async (key) => {
    try {
      const forecast = await getForecast(key);
      const todayForecast1 = await getCurrentCondition(key);
      setTodayForecast(todayForecast1);
      setWeatherForcast(forecast.DailyForecasts);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleOnChange = (city, code) => {
    setSelectedCity(city);
    getForcast(code);
    setCodeHolder(code);
    setLocationApi([]);
    setSearchedItem("");
  };

  useEffect(() => {
    handleOnChange("Tel Aviv", "215854");
  }, []);

  const handleDaySelection = (e) => {
    setSelectedDay(e);
  };

  const handleOnAddToFavorites = () => {
    let codeToNumber = +codeHolder;
    let tempList = {
      selectedDay: { selectedDay },
      selectedCity: { selectedCity },
      weatherData: { weatherForcast },
      key: { codeToNumber },
      todayData: { todayForecast },
      cityCode: { codeHolder },
    };
    dispatch({ type: addFavorite(), favorites: tempList });
  };

  const handleOnRemoveFavoritesMain = () => {
    dispatch({ type: deleteOneFavorite() });
  };

  return (
    <div className="App">
      <NavBar />
      <DynamicHeader text="Weather Forecast App"></DynamicHeader>

      <br />
      <Switch>
        <Route path="/favorite">
          <div>
            {favoCodes.length > 0 ? (
              <Button
                variant="outline-danger"
                onClick={handleOnRemoveFavoritesMain}
              >
                Clear favorites
              </Button>
            ) : null}
            {favoCodes.length > 0 ? (
              favoCodes.map((item) => (
                <FavoritePage
                  handleDaySelection={handleDaySelection}
                  selectedDay={item.selectedDay.selectedDay}
                  selectedCity={item.selectedCity.selectedCity}
                  weatherData={item.weatherData.weatherForcast}
                  key={item.key.codeToNumber}
                  todayData={item.todayData.todayForecast}
                  cityCode={item.cityCode.codeHolder}
                ></FavoritePage>
              ))
            ) : (
              <Button variant="outline-secondary">
                No favorites added yet
              </Button>
            )}
          </div>
        </Route>
        <Route path="/">
          <Dropdown
            locations={locationApi}
            handleOnChange={handleOnChange}
            setSearchedItem={setSearchedItem}
            searchedItem={searchedItem}
          />
          {Object.keys(weatherForcast).length === 0 ? null : (
            <div>
              <WeeklyWeather
                handleDaySelection={handleDaySelection}
                selectedDay={selectedDay}
                selectedCity={selectedCity}
                weatherData={weatherForcast}
                todayData={todayForecast}
              />
              {favoCodes.filter(
                (favorite) => +favorite.key.codeToNumber === +codeHolder
              ).length === 0 ? (
                <Button
                  variant="outline-primary"
                  onClick={handleOnAddToFavorites}
                >
                  Add to favorites
                </Button>
              ) : (
                <Button variant="outline-secondary">Added to favorites</Button>
              )}
            </div>
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default MainPage;

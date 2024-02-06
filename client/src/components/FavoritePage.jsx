import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteOneFavorite } from "../store/action/StoreActions";
import { WeeklyWeather } from "./WeeklyWeather";
import "../style/FavoritePage.css";

export const FavoritePage = (props) => {
  const [itemKey, setItemKey] = useState(props.cityCode);
  const dispatch = useDispatch();

  const handleOnRemoveFavorites = () => {
    dispatch({ type: deleteOneFavorite(), currentKey: itemKey });
  };

  return (
    <div className="favorite-card-container">
      <WeeklyWeather
        handleDaySelection={props.handleDaySelection}
        selectedDay={props.selectedDay}
        selectedCity={props.selectedCity}
        weatherData={props.weatherData}
        todayData={props.todayData}
      />
      <Button variant="outline-primary" onClick={handleOnRemoveFavorites}>
        Delete current city from favorites
      </Button>
    </div>
  );
};

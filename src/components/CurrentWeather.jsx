/* eslint-disable react/prop-types */

import { Card, CardContent, Typography } from '@mui/material';

const CurrentWeather = ({ weather }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{weather.name}</Typography>
        <Typography variant="h6">{weather.weather[0].description}</Typography>
        <Typography>Temperature: {weather.main.temp}°C</Typography>
        <Typography>Humidity: {weather.main.humidity}%</Typography>
        <Typography>Wind Speed: {weather.wind.speed} m/s</Typography>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;

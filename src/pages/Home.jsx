import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, styled, Typography } from '@mui/material';
import Search from '../components/Search';
import ErrorAlert from '../components/ErrorAlert';
import CurrentWeather from '../components/CurrentWeather';
import Forecast from '../components/Forecast';
import TemperatureChart from '../components/TemperatureChart';

const Component = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#f0f4f8',
});

const ContentWrapper = styled(Box)({
  maxWidth: '1200px',
  width: '100%',
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
});

const Image = styled(Box)({
  backgroundImage: `url(https://images.unsplash.com/photo-1454789476662-53eb23ba5907?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D)`,
  width: '100%',
  height: '300px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});


const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const Home = () => {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  const fetchWeather = async (city) => {
    if (city) {
      try {
        const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c915e6e66dab25f5295a6355a032defc`);
        setCurrentWeather(weatherResponse.data);
        
        const forecastResponse = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&units=metric&appid=c915e6e66dab25f5295a6355a032defc`);
        setForecast(forecastResponse.data.list);
        
        setError('');
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized: Invalid API key.');
        } else {
          setError('Could not fetch weather data. Please try again.');
        }
        setCurrentWeather(null);
        setForecast([]);
      }
    }
  };

  const debouncedFetchWeather = debounce(fetchWeather, 500);

  useEffect(() => {
    debouncedFetchWeather(city);
  }, [city]);

  return (
    <Component>
    <ContentWrapper>
      <Image />
      <Box p={3}>
        <Search onCitySelect={setCity} /> {/* Pass setCity as onCitySelect prop */}
        {error && <ErrorAlert message={error} />}
        {currentWeather && <CurrentWeather weather={currentWeather} />}
        {forecast.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              7-Day Forecast
            </Typography>
            <Forecast forecast={forecast} />
            <TemperatureChart forecast={forecast} />
          </>
        )}
      </Box>
    </ContentWrapper>
  </Component>
  );
};

export default Home;

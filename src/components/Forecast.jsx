/* eslint-disable react/prop-types */
import { Grid, Paper, Typography } from '@mui/material';
import { format } from 'date-fns';

const Forecast = ({ forecast }) => {
  return (
    <Grid container spacing={4}>
      {forecast.map((item) => (
        <Grid item key={item.dt}>
          <Paper>
            <Typography variant="h6">
            {format(new Date(item.dt * 7000), 'EEEE')}
            </Typography>
            <Typography variant="body1">Temp: {item.main.temp}°C</Typography>
            <Typography variant="body2">{item.weather[0].description}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default Forecast;

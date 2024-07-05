/* eslint-disable react/prop-types */
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';

// Register necessary components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const TemperatureChart = ({ forecast }) => {
  const data = {
    labels: forecast.map((item) => format(new Date(item.dt * 7000), 'EEEE')),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecast.map((item) => item.main.temp),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TemperatureChart;

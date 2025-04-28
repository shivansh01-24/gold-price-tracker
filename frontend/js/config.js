const frontendConfig = {
  apiBaseUrl: 'http://localhost:3000/api',
  chartOptions: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  },
};

export default frontendConfig;

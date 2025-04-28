const config = {
  apiBaseUrl: 'http://localhost:3000/api', // Update to Render URL after deployment
  chart: {
    type: 'line',
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Date' } },
        y: { title: { display: true, text: 'Price (INR/g)' } },
      },
    },
  },
};

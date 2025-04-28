let chartInstance;

function updateChart(history) {
  const ctx = document.getElementById('priceChart').getContext('2d');
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: config.chart.type,
    data: {
      labels: history.map(h => new Date(h.timestamp).toLocaleDateString()),
      datasets: [{
        label: 'Gold Price (INR/g)',
        data: history.map(h => h.price),
        borderColor: '#FFD700',
        fill: false,
      }],
    },
    options: config.chart.options,
  });
}

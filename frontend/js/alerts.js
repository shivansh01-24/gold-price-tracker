document.getElementById('setAlert').addEventListener('click', () => {
  const state = document.getElementById('stateSelect').value;
  const priceThreshold = prompt('Enter price threshold for 24K gold (INR/g):');
  if (!priceThreshold || isNaN(priceThreshold)) return alert('Invalid price');

  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      localStorage.setItem(`alert_${state}`, priceThreshold);
      alert('Alert set! You will be notified when 24K price exceeds ₹' + priceThreshold);
      checkAlerts(state, priceThreshold);
    }
  });
});

async function checkAlerts(state, threshold) {
  setInterval(async () => {
    const prices = await fetchCurrentPrices(state);
    const price24K = prices.find(p => p.karat === '24K');
    if (price24K && price24K.price > threshold) {
      new Notification(`Gold Price Alert: 24K in ${state} is ₹${price24K.price}/g`);
    }
  }, 600000); // Check every 10 minutes
}

// Load saved alerts
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith('alert_')) {
    const state = key.replace('alert_', '');
    const threshold = localStorage.getItem(key);
    checkAlerts(state, threshold);
  }
}

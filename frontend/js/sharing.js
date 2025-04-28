document.getElementById('shareWhatsApp').addEventListener('click', async () => {
  const state = document.getElementById('stateSelect').value;
  const prices = await fetchCurrentPrices(state);
  const price24K = prices.find(p => p.karat === '24K');
  if (price24K) {
    const text = `24K Gold in ${state}: ₹${price24K.price}/g (Gold Price Tracker)`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  }
});

document.getElementById('shareTwitter').addEventListener('click', async () => {
  const state = document.getElementById('stateSelect').value;
  const prices = await fetchCurrentPrices(state);
  const price24K = prices.find(p => p.karat === '24K');
  if (price24K) {
    const text = `24K Gold in ${state}: ₹${price24K.price}/g #GoldPriceTracker`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
  }
});

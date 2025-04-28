document.addEventListener('DOMContentLoaded', async () => {
  const stateSelect = document.getElementById('stateSelect');
  const priceDisplay = document.getElementById('priceDisplay');
  const newsFeed = document.getElementById('newsFeed');

  // Populate states
  const states = ['Delhi', 'Maharashtra', 'Tamil Nadu', 'West Bengal', 'Karnataka', /* Add all 36 states/UTs */];
  states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });

  async function updateUI(state) {
    logAnalytics('state_select', state);
    const prices = await fetchCurrentPrices(state);
    if (prices) {
      priceDisplay.innerHTML = prices.map(p => `
        <p>${p.karat}: ₹${p.price}/g (${p.source})</p>
      `).join('');
    } else {
      priceDisplay.innerHTML = '<p>Error loading prices. Showing last known data.</p>';
    }

    const history = await fetchPriceHistory(state, '24K', 30);
    if (history) {
      updateChart(history);
    }

    const news = await fetchNews();
    if (news) {
      newsFeed.innerHTML = news.map(n => `
        <li><a href="${n.url}" target="_blank" class="text-blue-500">${n.title}</a></li>
      `).join('');
    } else {
      newsFeed.innerHTML = '<li>Error loading news.</li>';
    }

    updateComparison(state);
  }

  stateSelect.addEventListener('change', (e) => updateUI(e.target.value));
  await updateUI('Delhi');
});

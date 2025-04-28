document.addEventListener('DOMContentLoaded', async () => {
  const stateSelect = document.getElementById('stateSelect');
  const priceDisplay = document.getElementById('priceDisplay');
  const newsFeed = document.getElementById('newsFeed');

  // Clear existing options to avoid duplicates
  while (stateSelect.firstChild) {
    stateSelect.removeChild(stateSelect.firstChild);
  }

  // Populate states
  const states = ['Delhi', 'Punjab', 'Bihar', 'Maharashtra', 'Uttar Pradesh'];
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
      priceDisplay.innerHTML = prices.map(p => {
        return '<p>' + p.karat + ': ₹' + p.price + '/g (' + p.source + ')</p>';
      }).join('');
    } else {
      priceDisplay.innerHTML = '<p>Error loading prices. Showing last known data.</p>';
    }

    const history = await fetchPriceHistory(state, '24K', 30);
    if (history) {
      updateChart(history);
    }

    const news = await fetchNews();
    if (news) {
      newsFeed.innerHTML = news.map(n => {
        return '<li><a href="' + n.url + '" target="_blank" class="text-blue-500">' + n.title + '</a></li>';
      }).join('');
    } else {
      newsFeed.innerHTML = '<li>Error loading news.</li>';
    }

    updateComparison(state);
  }

  stateSelect.addEventListener('change', (e) => updateUI(e.target.value));
  await updateUI('Delhi');
});

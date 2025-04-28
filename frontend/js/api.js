async function fetchCurrentPrices(state) {
  try {
    const response = await fetch(config.apiBaseUrl + '/prices/current?state=' + state);
    if (!response.ok) throw new Error('Failed to fetch prices');
    return await response.json();
  } catch (error) {
    console.error('Error fetching prices:', error);
    return null;
  }
}

async function fetchPriceHistory(state, karat, days) {
  try {
    const response = await fetch(config.apiBaseUrl + '/prices/history?state=' + state + '&karat=' + karat + '&days=' + days);
    if (!response.ok) throw new Error('Failed to fetch history');
    return await response.json();
  } catch (error) {
    console.error('Error fetching history:', error);
    return null;
  }
}

async function fetchNews() {
  try {
    const response = await fetch(config.apiBaseUrl + '/news');
    if (!response.ok) throw new Error('Failed to fetch news');
    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}

async function logAnalytics(event, state) {
  try {
    await fetch(config.apiBaseUrl + '/analytics/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, state }),
    });
  } catch (error) {
    console.error('Error logging analytics:', error);
  }
}

async function submitFeedback(message) {
  try {
    const response = await fetch(config.apiBaseUrl + '/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) throw new Error('Failed to submit feedback');
    return true;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return false;
  }
}

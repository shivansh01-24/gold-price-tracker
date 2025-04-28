async function testFrontend() {
  console.log('Testing frontend...');
  const prices = await fetchCurrentPrices('Delhi');
  console.log('Prices:', prices);
  const history = await fetchPriceHistory('Delhi', '24K', 7);
  console.log('History:', history);
  const news = await fetchNews();
  console.log('News:', news);
  await logAnalytics('test_event', 'Delhi');
  console.log('Analytics logged');
  const feedbackSuccess = await submitFeedback('Test feedback');
  console.log('Feedback submitted:', feedbackSuccess);
}

testFrontend();

const axios = require('axios');

async function testAPI() {
  const baseUrl = 'http://localhost:3000/api';
  try {
    console.log('Testing current prices...');
    const prices = await axios.get(baseUrl + '/prices/current?state=Delhi');
    console.log('Prices:', prices.data);

    console.log('Testing price history...');
    const history = await axios.get(baseUrl + '/prices/history?state=Delhi&karat=24K&days=7');
    console.log('History:', history.data);

    console.log('Testing news...');
    const news = await axios.get(baseUrl + '/news');
    console.log('News:', news.data);

    console.log('Testing analytics log...');
    await axios.post(baseUrl + '/analytics/log', { event: 'state_select', state: 'Delhi' });
    console.log('Analytics logged');

    console.log('Testing feedback...');
    await axios.post(baseUrl + '/feedback', { message: 'Test feedback' });
    console.log('Feedback submitted');
  } catch (error) {
    console.error('API test error:', error.message);
  }
}

testAPI();

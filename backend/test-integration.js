const { scrapePrices } = require('./scraper/parser');
const { scrapeNews } = require('./scraper/newsParser');
const axios = require('axios');

async function testIntegration() {
  console.log('Running integration test...');
  await scrapePrices();
  await scrapeNews();
  const baseUrl = 'http://localhost:3000/api';
  try {
    const prices = await axios.get(baseUrl + '/prices/current?state=Delhi');
    console.log('Fetched prices:', prices.data);
    const news = await axios.get(baseUrl + '/news');
    console.log('Fetched news:', news.data);
  } catch (error) {
    console.error('Integration test error:', error.message);
  }
}

testIntegration();

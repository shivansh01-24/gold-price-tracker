const axios = require('axios');

async function testPriceAPI() {
  try {
    const response = await axios.get('http://localhost:3000/api/prices/sample');
    console.log('Sample price data:', response.data);
  } catch (error) {
    console.error('Error fetching sample price data:', error.message);
  }
}

testPriceAPI();

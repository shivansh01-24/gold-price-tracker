const { scrapePrices } = require('./parser');
const { scrapeNews } = require('./newsParser');

async function testScraper() {
  console.log('Testing price scraper for Delhi, Chandigarh, Patna, Mumbai...');
  await scrapePrices();
  console.log('Testing news scraper...');
  await scrapeNews();
  console.log('Test complete');
}

testScraper();

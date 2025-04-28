const cron = require('node-cron');
const { scrapePrices } = require('./parser');
const { scrapeNews } = require('./newsParser');
const config = require('./config');

function startScraper() {
  console.log('Starting scraper...');
  cron.schedule(config.scrapeInterval, async () => {
    try {
      await scrapePrices();
      await scrapeNews();
      console.log('Scraping completed');
    } catch (error) {
      console.error('Scraping error:', error.message);
    }
  });
}

module.exports = { startScraper };

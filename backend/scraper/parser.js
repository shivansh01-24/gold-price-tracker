const axios = require('axios');
const cheerio = require('cheerio');
const UserAgent = require('user-agents');
const config = require('./config');
const stateMapping = require('../data/stateMapping');
const db = require('../config/db');
const { getProxy } = require('./proxy');

async function scrapePrices() {
  const userAgent = new UserAgent({ deviceCategory: 'desktop' });
  for (const city of config.cities) {
    let retries = 3;
    while (retries > 0) {
      try {
        const proxy = await getProxy();
        const url = config.baseUrl + config.pricePath + city + '.html';
        const { data } = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
            'Accept': 'text/html',
          },
          proxy: proxy ? { host: proxy.host, port: proxy.port } : false,
          timeout: 10000,
        });
        const $ = cheerio.load(data);

        const prices = [];
        // Try first structure (gold-rate-container)
        if ($('.gold-rate-container').length) {
          $('.gold-rate-container .gold-each-container').each((i, container) => {
            const karat = $(container).find('.gold-top .gold-common-head').text().trim().replace(/\s/g, ' ');
            const price = parseInt($(container).find('.gold-bottom .gold-common-head').text().replace(/[^0-9]/g, ''));
            const change = $(container).find('.gold-stock p').text().trim();
            prices.push({ karat, price, change });
          });
        }
        // Try second structure (gd-goldrates-content)
        if (!prices.length && $('.gd-goldrates-content#gold-rate').length) {
          $('.gd-goldrates-content#gold-rate .gd-goldrates-rows').each((i, row) => {
            const karat = $(row).find('.gd-goldrates-rowstitle').text().trim().replace(/\s/g, ' ');
            const price = parseInt($(row).find('.gd-goldrates-rowsprice').text().replace(/[^0-9]/g, ''));
            const change = $(row).find('.gd-goldrates-rowsgainloss').text().trim().split(' ')[0]; // e.g., "-₹680"
            prices.push({ karat, price, change });
          });
        }
        if (!prices.length) {
          throw new Error('Price container not found. Check selector or page structure.');
        }

        const state = stateMapping[city];
        for (const { karat, price } of prices) {
          const source = 'GoodReturns';
          let finalPrice = price;
          let finalKarat = karat;
          if (karat.includes('24K')) {
            finalKarat = '24K';
            const price18K = Math.round(price * 0.75);
            db.prepare('INSERT INTO prices (state, karat, price, source) VALUES (?, ?, ?, ?)')
              .run(state, '18K', price18K, 'Estimated');
          } else if (karat.includes('22K')) {
            finalKarat = '22K';
          }
          db.prepare('INSERT INTO prices (state, karat, price, source) VALUES (?, ?, ?, ?)')
            .run(state, finalKarat, finalPrice, source);
        }

        console.log('Scraped ' + city + ' successfully');
        await new Promise(resolve => setTimeout(resolve, Math.random() * (config.delayMax - config.delayMin) + config.delayMin));
        break; // Success, exit retry loop
      } catch (error) {
        console.error('Error scraping ' + city + ' (retry ' + (4 - retries) + '/3):', error.message);
        retries--;
        if (retries === 0 && error.response && [429, 403].includes(error.response.status)) {
          console.log('Rate limit detected, pausing for 15 minutes');
          await new Promise(resolve => setTimeout(resolve, 900000));
        }
        if (retries > 0) {
          console.log('Retrying with new proxy...');
          await new Promise(resolve => setTimeout(resolve, 5000)); // 5s before retry
        }
      }
    }
  }
}

module.exports = { scrapePrices };

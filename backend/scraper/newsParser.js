const axios = require('axios');
const cheerio = require('cheerio');
const UserAgent = require('user-agents');
const config = require('./config');
const db = require('../config/db');
const { getProxy } = require('./proxy');

async function scrapeNews() {
  let retries = 3;
  while (retries > 0) {
    try {
      const userAgent = new UserAgent({ deviceCategory: 'desktop' });
      const proxy = await getProxy();
      const url = config.baseUrl + config.newsPath;
      const { data } = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
          'Accept': 'text/html',
        },
        proxy: proxy ? { host: proxy.host, port: proxy.port } : false,
        timeout: 10000,
      });
      const $ = cheerio.load(data);

      if ($('.gd-news-container').length === 0) {
        throw new Error('News container not found. Check selector or page structure.');
      }

      const newsItems = $('.news_list h2 a').slice(0, 10);
      if (!newsItems.length) {
        console.warn('No news items found, selectors may be outdated');
        break;
      }

      const news = [];
      // Main news (optional)
      $('.gd-mainnews-title a').each((i, el) => {
        const title = $(el).text().trim();
        const url = $(el).attr('href');
        news.push({ title, url: `https://www.goodreturns.in${url}`, isMain: true });
      });
      // Other news
      $('.gd-othernews-block ul li a').slice(0, 9).each((i, el) => { // Limit to 9 to make total 10 with main news
        const title = $(el).text().trim();
        const url = $(el).attr('href');
        news.push({ title, url: `https://www.goodreturns.in${url}`, isMain: false });
      });
      return news;
    } catch (error) {
      console.error('Error scraping news (retry ' + (4 - retries) + '/3):', error.message);
      retries--;
      if (retries === 0 && error.response && [429, 403].includes(error.response.status)) {
        console.log('Rate limit detected, pausing for 15 minutes');
        await new Promise(resolve => setTimeout(resolve, 900000));
      }
      if (retries > 0) {
        console.log('Retrying with new proxy...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
}

module.exports = { scrapeNews };

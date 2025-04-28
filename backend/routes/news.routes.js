const express = require('express');
const router = express.Router();
const NodeCache = require('node-cache');
const db = require('../config/db');
const apiConfig = require('../config/api.config');

const cache = new NodeCache({ stdTTL: apiConfig.cacheTTL });

router.get('/', (req, res) => {
  const cacheKey = 'news';
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  const news = db.prepare('SELECT title, url, timestamp FROM news ORDER BY timestamp DESC LIMIT 10').all();
  cache.set(cacheKey, news);
  res.json(news);
});

module.exports = router;

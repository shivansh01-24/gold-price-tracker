const express = require('express');
const router = express.Router();
const NodeCache = require('node-cache');
const db = require('../config/db');
const apiConfig = require('../config/api.config');

const cache = new NodeCache({ stdTTL: apiConfig.cacheTTL });

router.get('/current', (req, res) => {
  const state = req.query.state || 'Delhi';
  const cacheKey = 'current_' + state;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  const prices = db.prepare(`
    SELECT karat, price, source, timestamp
    FROM prices
    WHERE state = ? AND timestamp = (SELECT MAX(timestamp) FROM prices WHERE state = ?)
  `).all(state, state);

  cache.set(cacheKey, prices);
  res.json(prices);
});

router.get('/history', (req, res) => {
  const state = req.query.state || 'Delhi';
  const karat = req.query.karat || '24K';
  const days = parseInt(req.query.days) || 30;
  const cacheKey = 'history_' + state + '_' + karat + '_' + days;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  const history = db.prepare(`
    SELECT price, timestamp
    FROM prices
    WHERE state = ? AND karat = ? AND timestamp >= datetime('now', ? || ' days')
    ORDER BY timestamp
  `).all(state, karat, '-' + days);

  cache.set(cacheKey, history);
  res.json(history);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/log', (req, res) => {
  const { event, state } = req.body;
  db.prepare('INSERT INTO analytics (event, state) VALUES (?, ?)').run(event, state);
  res.json({ status: 'logged' });
});

router.get('/stats', (req, res) => {
  // Simple authentication placeholder (replace with real auth later)
  if (req.query.key !== 'admin123') return res.status(401).json({ error: 'Unauthorized' });

  const stats = db.prepare(`
    SELECT state, COUNT(*) as count
    FROM analytics
    GROUP BY state
    ORDER BY count DESC
    LIMIT 10
  `).all();
  res.json(stats);
});

module.exports = router;

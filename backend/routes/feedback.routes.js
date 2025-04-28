const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });
  db.prepare('INSERT INTO feedback (message) VALUES (?)').run(message);
  res.json({ status: 'submitted' });
});

module.exports = router;

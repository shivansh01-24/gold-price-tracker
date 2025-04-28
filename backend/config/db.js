const Database = require('better-sqlite3');
const path = require('path');

const dbPath = process.env.DB_PATH || './goldprices.db';
const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    state TEXT,
    karat TEXT,
    price INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    source TEXT
  );
  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    url TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event TEXT,
    state TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Create trigger to delete prices older than 30 days
db.exec(`
  CREATE TRIGGER IF NOT EXISTS delete_old_prices
  AFTER INSERT ON prices
  BEGIN
    DELETE FROM prices WHERE timestamp < datetime('now', '-30 days');
  END;
`);

module.exports = db;

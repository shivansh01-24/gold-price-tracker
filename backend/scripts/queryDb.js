const path = require('path');
const Database = require('better-sqlite3');
const dbPath = path.resolve(__dirname, '../../goldprices.db');
const db = new Database(dbPath, { readonly: true });

function queryPrices() {
  const stmt = db.prepare("SELECT * FROM prices WHERE state IN ('Delhi', 'Punjab', 'Bihar', 'Maharashtra') LIMIT 10;");
  const rows = stmt.all();
  console.log('Prices:', rows);
}

function queryNews() {
  const stmt = db.prepare("SELECT * FROM news LIMIT 10;");
  const rows = stmt.all();
  console.log('News:', rows);
}

queryPrices();
queryNews();

function queryNewsCount() {
  const stmt = db.prepare("SELECT COUNT(*) as count FROM news;");
  const row = stmt.get();
  console.log('News count:', row.count);
}

queryNewsCount();

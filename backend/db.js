// Simple sqlite3 connection and helper
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'contacts.db');


const db = new sqlite3.Database(dbPath, (err) => {
if (err) return console.error('DB open error', err.message);
console.log('Connected to SQLite DB at', dbPath);
});


// Create table if not exists
const createTable = `
CREATE TABLE IF NOT EXISTS contacts (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT,
phone TEXT,
tags TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;


db.run(createTable, (err) => {
if (err) console.error('Create table error', err.message);
});


module.exports = db;
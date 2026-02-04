const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

// create tables
db.serialize(() => {

  db.run(`
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )`);

  db.run(`
  CREATE TABLE IF NOT EXISTS shipments(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tracking TEXT,
    sender_name TEXT,
    sender_phone TEXT,
    sender_address TEXT,
    receiver_name TEXT,
    receiver_phone TEXT,
    receiver_address TEXT,
    description TEXT,
    weight TEXT,
    amount TEXT,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // create default admin
  db.run(`
  INSERT OR IGNORE INTO users(id, username, password)
  VALUES(1,'admin','Agu12345$')
  `);

});

module.exports = db;

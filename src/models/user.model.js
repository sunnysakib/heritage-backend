const db = require('../config/db');

const User = {
  create: (name, email, password, role) => {
    return db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]);
  },

  findByEmail: (email) => {
    return db.query('SELECT * FROM users WHERE email = ?', [email]);
  },
};

module.exports = User;
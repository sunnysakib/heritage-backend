const db = require('../config/db');

const User = {
  create: (name, email, password, role) => {
    return db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]);
  },

  findByEmail: (email) => {
    return db.query('SELECT * FROM users WHERE email = ?', [email]);
  },
  findByRole: (email) => {
    return db.query('SELECT * FROM users WHERE email = ? and role = ?', [email, 'admin']);
  },

  findAll: () => {
    return db.query('SELECT id, name, email, role FROM users');
  },

  findById: (id) => {
    return db.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
  },
  
  update: (id, name, email, role) => {
    return db.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, id]);
  },

  delete: (id) => {
    return db.query('DELETE FROM users WHERE id = ?', [id]);
  },
};

module.exports = User;
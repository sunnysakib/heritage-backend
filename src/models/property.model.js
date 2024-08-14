const db = require('../config/db');

const Property = {
  create: (data) => {
    const { userId, title, description, propertyType, category, bathroom, bedroom, location, photo, price, host } = data;
    return db.query(
      'INSERT INTO properties (userId, title, description, propertyType, category, bathroom, bedroom, location, photo, price, host) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, title, description, propertyType, category, bathroom, bedroom, location, photo, price, host]
    );
  },

  getAll: () => {
    return db.query('SELECT * FROM properties');
  },
  findByUserId: (userId) => {
    return db.query('SELECT * FROM properties WHERE userId = ?', [userId]);
  },

  findById: (id) => {
    return db.query('SELECT * FROM properties WHERE id = ?', [id]);
  },

  update: (id, data) => {
    const { userId, title, description, propertyType, category, bathroom, bedroom, location, photo, price, bid, host, bidWinner } = data;
    return db.query(
      'UPDATE properties SET userId = ?, title = ?, description = ?, propertyType = ?,category= ?, bathroom = ?, bedroom = ?, location = ?, photo = ?, price = ?, bid = ?, host = ?, bidWinner = ? WHERE id = ?',
      [userId, title, description, propertyType, category, bathroom, bedroom, location, photo, price, bid, host, bidWinner, id]
    );
  },

  delete: (id) => {
    return db.query('DELETE FROM properties WHERE id = ?', [id]);
  },

  addBid: (propertyId, bid) => {
    return db.query('UPDATE properties SET bid = ? WHERE id = ?', [bid, propertyId]);
  },

  searchQury: (data) => {

    const { title, location, propertyType, minPrice } = data;

    let query = "SELECT * FROM properties WHERE 1=1";
    let queryParams = [];

    if (title) {
      const modifiedTitle = title.replace(/\+/g, ' ');
      query += "AND title = ?";
      queryParams.push(modifiedTitle);
    }
    if (location) {
      const modifiedLoc = location.replace(/\+/g, ' ');
      query += " AND location = ?";
      queryParams.push(modifiedLoc);
    }

    if (propertyType) {
      query += " AND propertyType = ?";
      queryParams.push(propertyType);
    }

    if (minPrice) {
      query += " AND price <= ?";
      queryParams.push(minPrice);
    }

    return db.query(query, queryParams);
  }
};



module.exports = Property;

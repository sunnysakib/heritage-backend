const db = require('../config/db');

const bidInfo = {
    create: (data) => {
        const { userId, bidAmount, name, email, propertyId, propertyName } = data;

        return db.query('INSERT INTO bidinfo (userId, bidAmount, name, email, propertyId, propertyName) VALUES (?, ?, ?, ?, ?, ?)', [userId, bidAmount, name, email, propertyId, propertyName]);
    },

    findExistingBid: (userId, propertyId) => {
        return db.query('SELECT * FROM bidinfo WHERE userId = ? AND propertyId = ?', [userId, propertyId]);
    },
    findHighestBid: (propertyId) => {
        return db.query(
            'SELECT * FROM bidinfo WHERE propertyId = ? ORDER BY bidAmount DESC LIMIT 1',
            [propertyId]
        );
    },
    winnerBid: (propertyId, bid) => {
        console.log(propertyId, bid);
        
        return db.query('SELECT * FROM bidInfo WHERE propertyId = ? AND bidAmount = ?', [propertyId, bid]);
      },
    update: (data) => {
        const { userId, bidAmount, propertyId } = data;
        return db.query('UPDATE bidinfo SET bidAmount = ? WHERE userId = ? AND propertyId = ?', [bidAmount, userId, propertyId]);
    },

};

module.exports = bidInfo;
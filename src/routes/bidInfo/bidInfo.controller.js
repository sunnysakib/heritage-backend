const bidInfo = require("../../models/BidInfo.model");
const Property = require("../../models/property.model");

// Create 
const bidCreate = async (req, res) => {
    const { userId, bidAmount, name, email, propertyId, propertyName } = req.body;
    try {
        const [property] = await Property.findById(propertyId);

        if (property[0].bid < bidAmount && property[0].price >= bidAmount) {

            const [existingBid] = await bidInfo.findExistingBid(userId, propertyId);
            if (existingBid.length > 0) {
                await bidInfo.update({ userId, bidAmount, propertyId });
                await Property.addBid(propertyId, bidAmount);
                res.status(201).json({ message: 'created', data: { userId, bidAmount, name, email, propertyId, propertyName } });
            } else {
                await bidInfo.create({ userId, bidAmount, name, email, propertyId, propertyName });
                await Property.addBid(propertyId, bidAmount);
                res.status(201).json({ message: 'created', data: { userId, bidAmount, name, email, propertyId, propertyName } });
            }
        } else {
            res.status(201).json({ message: 'Bid amount not accepted' });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getHeigestBidInfo = async (req, res) => {
    const {id } = req.params;
    try {
        const [bid] = await bidInfo.findHighestBid(id);

        res.status(201).json({ message: 'ok', data: bid });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { bidCreate, getHeigestBidInfo }
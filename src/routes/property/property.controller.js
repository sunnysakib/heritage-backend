const Property = require('../../models/property.model');
const fs = require('fs');
const path = require('path');

// Create a new property
const createProperty = async (req, res) => {
    const { userId, title, description, propertyType, category, bathroom, bedroom, location, price, host } = req.body;
    const photo = req.file.filename;

    try {
        await Property.create({ userId, title, description, propertyType, category, bathroom, bedroom, location, photo, price, host });
        res.status(201).json({ message: 'created', data: { userId, title, description, propertyType, category, bathroom, bedroom, location, photo, price, host } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPropertiesFilter = async (req, res) => {
    const { title, location, propertyType, minPrice } = req.query;

    try {

        const [properties] = await Property.searchQury({ title, location, propertyType, minPrice });
        res.status(200).json(properties);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get properties
const getProperties = async (req, res) => {

    try {
        
        // let [properties] = await Property.getAll();
        // properties = properties.map(property => {
        //     if (parseFloat(property.bid) === property.price) {
        //         console.log(property.id, property.bid);
        //         let [bidWinnerInfo] = bidInfo.winnerBid(property.id, property.bid);
        //         console.log("here");

        //         console.log(bidInfo);
        //         let UpdatePro = { ...property, bidWinner: bidWinnerInfo };
        //       return Property.update(property.id, UpdatePro);
        //     }
        //     return property;
        //   });

        let [newProperties] = await Property.getAll();

        res.status(200).json(newProperties);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get properties by ID
const getPropertyById = async (req, res) => {
    const { id } = req.params;

    try {
        const [properties] = await Property.findById(id);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get properties by user ID
const getPropertiesByUserId = async (req, res) => {
    const userId = req.user.id;

    try {
        const [properties] = await Property.findByUserId(userId);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a property
const updateProperty = async (req, res) => {
    const { id } = req.params;
    const { userId, title, description, propertyType, category, bathroom, bedroom, location, price, host } = req.body;

    const photo = req.file.filename;

    try {
        await Property.update(id, { userId, title, description, propertyType, category, bathroom, bedroom, location, photo, price, host });
        res.status(201).json({ message: 'Property updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a property
const deleteProperty = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the property to delete associated photos
        const [property] = await Property.findById(id);
        if (property.length > 0) {
            const photos = property[0].photos.split(',');
            photos.forEach(photo => fs.unlinkSync(path.join(__dirname, '../uploads/photos', photo)));
        }

        await Property.delete(id);
        res.status(201).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a bid to a property
const addBid = async (req, res) => {
    const { id } = req.params;
    const { bid } = req.body;

    try {
        await Property.addBid(id, bid);
        res.status(201).json({ message: 'Bid added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProperty, getProperties, getPropertyById, getPropertiesByUserId, updateProperty, deleteProperty, addBid, getPropertiesFilter };

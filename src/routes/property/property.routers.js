const express = require('express');
const multer = require('multer');
const path = require('path');
const { createProperty, getPropertiesByUserId, updateProperty, deleteProperty, addBid, getProperties, getPropertyById, getPropertiesFilter } = require('./property.controller');


const PropertyRouter = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
})
const upload = multer({ storage: storage,  limits: { fileSize: 1024 * 1024 * 5 }, });


PropertyRouter.post('/', upload.single('photo'),  createProperty);
PropertyRouter.get('/', getProperties);
PropertyRouter.get('/filter/', getPropertiesFilter);
PropertyRouter.get('/details/:id', getPropertyById);
PropertyRouter.get('/:id', getPropertiesByUserId);
PropertyRouter.put('/:id', updateProperty);
PropertyRouter.delete('/:id', deleteProperty);
PropertyRouter.post('/:id/bid', addBid);

module.exports = PropertyRouter;

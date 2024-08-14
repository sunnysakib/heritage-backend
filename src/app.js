const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRouter = require('./routes/user/user.routers');
const PropertyRouter = require('./routes/property/property.routers');
const bidRouter = require('./routes/bidInfo/bidInfo.routers');


// Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/users', userRouter);
app.use('/properties', PropertyRouter);
app.use('/bid', bidRouter);


app.use(express.static('public'));

// root route
app.get('/', (req, res) => {
    res.send("Heritage server");
})


module.exports = app;
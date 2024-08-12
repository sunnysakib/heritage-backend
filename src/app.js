const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRouter = require('./routes/user/user.routers');


// Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/users', userRouter);

// root route
app.get('/', (req, res) => {
    res.send("Heritage server");
})


module.exports = app;
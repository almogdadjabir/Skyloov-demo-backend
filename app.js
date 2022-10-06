const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

const propertiesRoute = require('./routes/properties');
const wishlisRtoute = require('./routes/wishlist');

app.use('/api/properties', propertiesRoute);
app.use('/api/wishlist', wishlisRtoute);

mongoose.connect(process.env.DB_CONNECTION, () => 
    console.log('Connected to DB!')
);

app.listen(3000);
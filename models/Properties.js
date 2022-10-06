const mongoose = require('mongoose');

const PropertiesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    location: String,
    price: {
        type: Number,
        required: true
    },
    distance: String,
    type: {
        type: Number,
        default: 1
    },
    bedroom: Number,
    bathroom: Number,
    description: String,
    emirate: String
});

module.exports = mongoose.model('Properties', PropertiesSchema);
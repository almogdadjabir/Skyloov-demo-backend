const mongoose = require('mongoose');

const WishlistSchema = mongoose.Schema({
    user: {
        type: Number,
        required: true
    },
    property: {
        type: mongoose.Types.ObjectId,
        required: true
    },
});

module.exports = mongoose.model('Wishlist', WishlistSchema);
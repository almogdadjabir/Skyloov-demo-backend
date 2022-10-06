const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const Properties = require('../models/Properties');


// Get All The properties
router.get('/', async (req, res)=>{
    try {
        const wishlists = await Wishlist.find();
        res.status(200).json(wishlists);
    } catch (err) {
        res.json({message: err});
    }
});

// add new property
router.post('/', async (req, res)=>{
    const wishlist = new Wishlist({
        user: req.body.user,
        property:  req.body.property
    });

    try{
        const savedWishlist = await wishlist.save();
        res.json(savedWishlist);
    }catch(err){
        res.json({message: err});
    }


});


module.exports = router;
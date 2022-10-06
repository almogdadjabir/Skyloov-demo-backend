const express = require('express');
const router = express.Router();
const Properties = require('../models/Properties');


// Get All The properties
router.get('/', async (req, res)=>{
    try {
        const fields = ['title', 'bedroom', 'bathroom', 'price'];
        const {page=0, limit=0} = req.query;
        const search = req.query.search || "";
        const bedroom = req.query.bedroom || undefined;
        const bathroom = req.query.bathroom || undefined;
        const minPrice = req.query.minPrice || 0;
        const maxPrice = req.query.maxPrice || 1000000;


        let sort = req.query.sort || "rating";
        let emirate = req.query.emirate || "All";

        const emirateList = [
            "Abu Dhabi",
            "Dubai",
            "Sharjah",
            "Ajman",
            "Umm Al Quwain",
            "Ras Al Khaimah",
            "Fujairah",
        ];

        emirate === "All"
            ? (emirate = [...emirateList])
            :(emirate = req.query.emirate.split(","));
        req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        let sortBy = {};
        if(sort[1]){
            sortBy[sort[0]] = sort[1]; 
        }else{
            sortBy[sort[0]] = "asc";
        }

        var query = {
            title: {$regex: search, $options:"i"},
            bedroom: bedroom,
            bathroom: bathroom,
            price: { $gt: minPrice, $lt: maxPrice },
       }



        const properties = await Properties.find(getFilter(query, fields))
        .where("emirate")
        .in([...emirate])
        .sort(sortBy)
        .limit(limit*1)
        .skip((page-1)*limit);
        res.status(200).json(properties);
    } catch (err) {
        res.json({message: err});
    }
});

// add new property
router.post('/', async (req, res)=>{
    const property = new Properties({
        title: req.body.title,
        imageURL: req.body.imageURL,
        location: req.body.location,
        price: req.body.price,
        distance: req.body.distance,
        type: req.body.type,
        bedroom: req.body.bedroom,
        bathroom: req.body.bathroom,
        description: req.body.description,
        emirate: req.body.emirate
    });

    try{
        const savedProperty = await property.save();
        res.json(savedProperty);
    }catch(err){
        res.json({message: err});
    }


});

router.get('/:propertyId', async (req, res) =>{
    try{
        const property = await Properties.findById(req.params.propertyId);
        res.json(property);
    }catch(err){
        res.json({message: err});
    }

});

//delete
router.delete('/:propertyId', async (req, res) =>{
    try{
        const removeProperty = await Properties.remove({_id: req.params.propertyId});
        res.json(removeProperty);
    }catch(err){
        res.json({message: err});
    }
});

//update
router.patch('/:propertyId', async (req, res) =>{
    try{
        const updateProperty = await Properties.updateOne({_id: req.params.propertyId},
            {$set:{
                title: req.body.title,
                imageURL: req.body.imageURL,
                location: req.body.location,
                price: req.body.price,
                distance: req.body.distance,
                type: req.body.type,
                bedroom: req.body.bedroom,
                bathroom: req.body.bathroom,
                description: req.body.description,
                emirate: req.body.emirate}}
            );
        res.json(updateProperty);
    }catch(err){
        res.json({message: err});
    }
});


function getFilter(query, fields) {
    return fields.reduce((filter, field) => {
  
      if (query[field] !== undefined)
        return {
          [field]: query[field],
          ...filter,
        };

  
      return filter;
    }, {});
  }


module.exports = router;
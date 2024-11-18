const express = require('express');
const Review = require('../models/product_review');
const reviewRouter = express.Router();

reviewRouter.post('/api/product_review', async (req, res) => {
    try {
        const {buyerId,email,fullName,productId,rating,review} = req.body;
        const reviews = new Review({ buyerId,email,fullName,productId,rating,review });
        await reviews.save();
        return res.status(201).send(reviews);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


reviewRouter.get('/api/reviews',async(req,res) => {
    try {
        const reviews = await Review.find();
        return res.status(200).send(reviews);
    } catch (e) {
        res.status(500).json({error:e.message});
    }
});

module.exports = reviewRouter;


//request call : post
//Address   : Post => localhost:3000/api/product_review
// { 
//     "name" : "Glasses",
//     "image" : "https://icons.veryicon.com/png/o/commerce-shopping/beautiful-clothes-2/4-143.png",
//     "banner" : "https://icons.veryicon.com/png/o/commerce-shopping/beautiful-clothes-2/4-143.png"
// }


//request call : get
//Address   : Get => localhost:3000/api/category

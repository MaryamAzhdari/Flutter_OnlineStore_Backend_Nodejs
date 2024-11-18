const express = require('express');
const Category = require('../models/category');
const categoryRouter = express.Router();

categoryRouter.post('/api/category', async (req, res) => {
    try {
        const {name,image,banner} = req.body;
        const category = new Category({ name,image,banner });
        await category.save();
        return res.status(201).send(category);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


categoryRouter.get('/api/category',async(req,res) => {
    try {
        const categories = await Category.find();
        return res.status(200).send(categories);
    } catch (e) {
        res.status(500).json({error:e.message});
    }
});

module.exports = categoryRouter;


//request call : post
//Address   : Post => localhost:3000/api/category
// { 
//     "name" : "Glasses",
//     "image" : "https://icons.veryicon.com/png/o/commerce-shopping/beautiful-clothes-2/4-143.png",
//     "banner" : "https://icons.veryicon.com/png/o/commerce-shopping/beautiful-clothes-2/4-143.png"
// }


//request call : get
//Address   : Get => localhost:3000/api/category

const express = require('express');
const SubCategory = require('../models/sub_category');
const subCategoryRouter = express.Router();

subCategoryRouter.post('/api/subcategory', async (req, res) => {
    try {
        const { categoryId, categoryName, subCategoryName, image } = req.body;
        const subCategory = new SubCategory({ categoryId, categoryName, subCategoryName, image });
        await subCategory.save();
        return res.status(201).send(subCategory);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


subCategoryRouter.get('/api/subcategory', async (req, res) => {
    try {
        const subCategories = await SubCategory.find();
        return res.status(200).send(subCategories);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

subCategoryRouter.get('/api/category/:categoryName/subcategory', async (req, res) => {
    try {
        const { categoryName } = req.params;
        const subCategories = await SubCategory.find({ categoryName: categoryName });
        //Check if any subcategories were found
        if (!subCategories || subCategories.length == 0)
            return res.status(404).json({msg:"SubCategoris Not Found"});
        else
            return res.status(200).json(subCategories);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = subCategoryRouter;


//request call : post
//Address   : Post => localhost:3000/api/subcategory
// { 
//     "categoryId" : "m444",
//     "categoryName" : "Clothes",
//     "subCategoryName" : "Shirts",
//     "image" : "https://icons.veryicon.com/png/o/commerce-shopping/beautiful-clothes-2/16-138.png"
// }


//request call : get
//Address   : Get => localhost:3000/api/subcategory


//request call : get
//Address   : Get => localhost:3000/api/category/Clothes/subcategory

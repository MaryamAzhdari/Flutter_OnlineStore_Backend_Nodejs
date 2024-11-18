//Create EndPoint
const express = require('express');
const Product = require('../models/product');
const productRouter = express.Router();

productRouter.post('/api/add-product', async (req, res) => {
    try {
        const {name,price,quality,describtion,category,subCategory,image} = req.body;
        const product = new Product({name,price,quality,describtion,category,subCategory,image});
        await product.save();
        return res.status(201).send(product);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


// productRouter.get('/api/category',async(req,res) => {
//     try {
//         const categories = await Product.find();
//         return res.status(200).send({categories});
//     } catch (e) {
//         res.status(500).json({error:e.message});
//     }
// });

productRouter.get('/api/popular-prodocts',async(req,res) => {
    try {
        const prodocts = await Product.find({popular:true});
        if(!prodocts || prodocts.length==0){
            return res.status(404).json({msg:"Products Not Found"});
        }
        return res.status(200).send({prodocts});
    } catch (e) {
        res.status(500).json({error:e.message});
    }
});

productRouter.get('/api/recommended-prodocts',async(req,res) => {
    try {
        const prodocts = await Product.find({recommend:true});
        if(!prodocts || prodocts.length==0){
            return res.status(404).json({msg:"Products Not Found"});
        }
        return res.status(200).send(prodocts);
    } catch (e) {
        res.status(500).json({error:e.message});
    }
});

module.exports = productRouter;


//request call : post
//Address   : Post => localhost:3000/api/add-product
// {
//     "name" : "Gucci",
//     "price" : 100.0 ,
//     "quality" : 100,
//     "describtion" : "Gucci oversize bes for you",
//     "category" : "Clothes",
//     "subCategory" : "Shirt",
//     "image" : "https://www.luisaviaroma.com/en-se/p/gucci/men/80I-XBO011"
// }


//request call : get
//Address   : Get => localhost:3000/api/popular-prodocts

//request call : get
//Address   : Get => localhost:3000/api/recommended-prodocts

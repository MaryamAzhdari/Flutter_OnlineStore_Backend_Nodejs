const express = require('express');
const Banner = require('../models/banner');
const bannerRouter = express.Router();

bannerRouter.post('/api/banner', async (req, res) => {
    try {
        const { image } = req.body;
        const banner = await new Banner({ image });
        await banner.save();
        return res.status(201).send(banner);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});


bannerRouter.get('/api/banner',async(req,res) => {
    try {
        const banners = await Banner.find();
        return res.status(200).send(banners);
    } catch (e) {
        res.status(500).json({error:e.message});
    }
});

module.exports = bannerRouter;


//request call : post
//Address   : Post => localhost:3000/api/banner
//Body      : 
//{ 
  //"image" : "https://d3pxwdeb4y32a1.cloudfront.net/wp-content/uploads/2021/07/flutter-tools.webp"
//}


//request call : get
//Address   : Get => localhost:3000/api/banner

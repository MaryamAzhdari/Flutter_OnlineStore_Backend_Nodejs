const express = require('express');

const helloRoute = express.Router();

//req = request  (Data From Forms)
//res = response (Data From Server)
helloRoute.get("/hello",(req,res)=>{
    res.send('Hello World');
})

module.exports = helloRoute;
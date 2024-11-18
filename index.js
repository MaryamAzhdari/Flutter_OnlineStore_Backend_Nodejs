//console.log('Hello World');
//import the express module
const express = require('express');
const mongoose = require("mongoose");
const helloRoute = require('./routes/hello');
const authRouter = require('./routes/auth');
const bannerRouter = require('./routes/banner');
const categoryRouter = require('./routes/category');
const subCategoryRouter = require('./routes/sub_category');
const productRouter = require('./routes/product');
const productReviewRouter = require('./routes/product_review');
//Allow for make the Pose request to the server from app
const cors = require('cors');
//Define the port number the server will liston on
const PORT = 3000;

//Create an instance of an express application
//Because it give us the starting point
const app = express();

//MongoDB string
const DB = "mongodb+srv://maryamazhdarimailbox:maryamadmin@cluster0.wzu2r.mongodb.net/"

//Middleware - to register routes or to mount routes
app.use(helloRoute);
app.use(express.json());
app.use(cors());//Enable cors for all routes and origin(Domain)
app.use(authRouter);
app.use(bannerRouter);
app.use(categoryRouter);
app.use(subCategoryRouter);
app.use(productRouter);
app.use(productReviewRouter);

//mongoose.connect('mongodb://127.0.0.1/e-commerce')
mongoose.connect(DB).then(()=>{
    console.log('mongodb connected');
});

//Start the server and listen on the specified port
//Run Server with SQL
app.listen(PORT,"0.0.0.0",function(){
    //LOG THE NUMBER
    console.log(`server is running on port ${PORT}`);
})

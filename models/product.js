//Create Schema
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quality: {
        type: Number,
        required: true,
    },
    describtion: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    image: [
        {
            type: String,
            required: true,
        }
    ],
    popular:{
        type : Boolean,
        default : false,
    },
    recommend:{
        type : Boolean,
        default : true,
    },

});

const Procuct = mongoose.model("Procuct", productSchema);

module.exports = Procuct;

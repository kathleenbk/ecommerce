const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name:{
        type: String, required: true, unique: true 
    },
    description:{
        type: String, required: true,
    },
    image:{
        type: String, required: true,
    },
    categories:{
        type: Array
    },
    weight:{
        type: Number,
    },
    ingredients:{
        type: String
    },
    price:{
        type: Number, required: true,
    },
    inStock: {
        type: Boolean, default: true
    },

}, { timestamps : true });

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;

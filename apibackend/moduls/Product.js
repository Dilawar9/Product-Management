const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    price: {
        type: String,
        required: [true, "Product price is required"]
    },
    image: {
        type: String,
        required:[true,"Product Image is required"]
    },
    category: {
        type: String,
        enum: { values: ['Shirts', 'Pents','Mobiles'], message: '{VALUE} is not supported' },
        required: [true, "Product category is required"]
    }
})


const Product = mongoose.model('Product', schema);

module.exports = Product;
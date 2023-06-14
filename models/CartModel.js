const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema({
    username: { type: String, required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Surfboard', required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true }
    }],
    totalPrice: { type: Number, default: 0 }
});


module.exports = mongoose.model("Cart", cartSchema);
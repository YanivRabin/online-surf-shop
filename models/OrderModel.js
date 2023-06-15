const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Surfboard', required: true },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Order', orderSchema);
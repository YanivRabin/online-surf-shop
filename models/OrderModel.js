const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    products: [{
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1 }
    }],
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
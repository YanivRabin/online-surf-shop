const mongoose = require('mongoose');

// ShoppingCart Schema
const shoppingCartSchema = new mongoose.Schema({
    ShoppingCartPK: { type: Number, required: true },
    ShoppingCartUserID: { type: Number, required: true },
    ShoppingCartProducts: { type: [Number], required: true },
    ShoppingCartTotalPrice: { type: Number, required: true }
});

const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);

module.exports = {
    ShoppingCart
};
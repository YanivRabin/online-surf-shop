const mongoose = require('mongoose');

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    TransactionPK: { type: Number, required: true },
    UserID: { type: Number, required: true },
    Products: { type: [String], required: true },
    TransactionTotalPrice: { type: Number, required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);


module.exports = {
    Transaction
};
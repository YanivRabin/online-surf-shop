const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    UserID: { type: Number, required: true, unique: true },
    UserLevel: { type: String, required: true },
    UserFullName: { type: String, required: true },
    UserEmail: { type: String, required: true },
    UserUserName: { type: Number, required: true },
    UserPassword: { type: String, required: true },
    UserVisa: { type: String, required: true },
    UserTransactions: { type: [mongoose.Schema.Types.ObjectId], ref: 'Transaction' }
});
const User = mongoose.model('User', userSchema);


module.exports = {
    User
};
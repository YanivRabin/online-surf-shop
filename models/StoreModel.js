const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: {type: String, required: true}, // Added this line
    photoURL: {type: String}, // And this line
    description: {type: String}, // And this one
    address: {type: String , require: true} ,
    lat: {type: Number, require: true},
    lng: {type: Number, require: true}
});

module.exports = mongoose.model('Store', storeSchema);

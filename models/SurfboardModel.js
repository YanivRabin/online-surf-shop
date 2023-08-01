const mongoose = require('mongoose');

const surfboardSchema = new mongoose.Schema({

    company: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    // image: { type: [String], required: true },
    image: { type: String, required: true },
    // color: { type: String, required: true },
    type: { type: String, required: true },
    tail: { type: String, required: true }
    // height: { type: String, required: true },
    // width: { type: Number, required: true },
    // thick: { type: Number, required: true },
    // volume: { type: Number, required: true }
});

module.exports = mongoose.model('Surfboard', surfboardSchema);
const mongoose = require('mongoose');

const surfboardSchema = new mongoose.Schema({

    ProductPK: { type: Number, required: true },
    ProductName: { type: String, required: true },
    ProductManufacturingCompany: { type: String, required: true },
    ProductPrice: { type: Number, required: true },
    ProductImage: { type: [String], required: true },
    ProductColor: { type: String, required: true },
    ProductTitle: { type: String, required: true },
    ProductTail: { type: String, required: true },
    ProductSize: { type: String, required: true },
    ProductWidth: { type: Number, required: true },
    ProductThick: { type: Number, required: true },
    ProductVol: { type: String, required: true }
});

module.exports = mongoose.model('Surfboard', surfboardSchema);
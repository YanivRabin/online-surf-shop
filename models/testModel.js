const {mongoose} = require('mongoose');


const testSchema = new mongoose.Schema({

    name: String,
    rating: Number
});

module.exports = mongoose.model("Test", testSchema);

// const Test = mongoose.model("Test", testSchema);
// const test = new Test({
//
//     name: "Onion",
//     rating: 10
// })
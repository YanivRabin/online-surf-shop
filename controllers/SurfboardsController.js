const Surfboard = require('../models/SurfboardModel');


const getSurfboardsPage = async (req, res) => {

    try {

        const surfboards = await Surfboard.find({});
        res.json(surfboards);
    } catch (err) {

        console.error('Failed to find surfboards:', err);
        res.status(500).send('Internal Server Error');
    }
}

// const createSurfboard = async () => {
//
//     const surfboard = new Surfboard ({
//         company: "Sharp Eye",
//         model: "Storm",
//         price: 900,
//         image: [
//             "stormst2_allSides.png",
//             "stormst2_bottom.png",
//             "stormst2_deck.png",
//             "stormst2_lcon.png",
//             "stormst2_rail.png"
//         ],
//         color: "White",
//         type: "Short",
//         tail: "Swallow",
//         height: "5'4",
//         width: 19,
//         thick: 2.38,
//         volume: 26
//     });
//     await surfboard.save();
//
// };

module.exports = {

    getSurfboardsPage
}

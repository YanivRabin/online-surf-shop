const Surfboard = require('../models/SurfboardModel');


const getSurfboardsPage = async (req, res) => {

    try {

        const surfboards = await Surfboard.find({});
        res.json(surfboards);
    }
    catch (err) {

        console.error('Failed to find surfboards:', err);
        res.status(500).send('Internal Server Error');
    }
};

// const createTest = async () => {
//
//     const test = new Test( { name: "test" } );
//     return await test.save()
// }

module.exports = {

    getSurfboardsPage
}

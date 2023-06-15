const Surfboard = require('../models/SurfboardModel');
const path = require("path");


const getSurfboardsPage = (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/surfboards.html'))
};

const getAllSurfboards = async (req, res) => {

    try {
        const surfboards = await Surfboard.find({});
        return res.json({ surfboards: surfboards });
    }
    catch (error) {
        console.error('Failed to find surfboards:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createSurfboard = async (req, res) => {

    const { company, model, price, image, color, type, tail, height, width, thick, volume } = req.body;

    try {

        // Create a new surfboard object
        const newSurfboard = new Surfboard({
            company: company,
            model: model,
            price: Number(price),
            image: image,
            color: color,
            type: type,
            tail: tail,
            height: height,
            width: Number(width),
            thick: Number(thick),
            volume: Number(volume)
        });

        await newSurfboard.save();
        return res.status(201).json({ newSurfboard: newSurfboard });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateSurfboard = async (req, res) => {

    const { _id, company, model, price, image, color, type, tail, height, width, thick, volume } = req.body;

    try {

        // Find and update the surfboard
        const updatedSurfboard = await Surfboard.findByIdAndUpdate(
            _id,
            { company, model, price, image, color, type, tail, height, width, thick, volume },
            { new: true }
        );

        if (!updatedSurfboard)
            return res.status(404).json({ message: 'Surfboard not found' });

        return res.json({ updatedSurfboard: updatedSurfboard });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteSurfboard = async (req, res) => {

    const { surfboardId } = req.body;

    try {

        // Find and delete the surfboard
        const deleteSurfboard = await Surfboard.findByIdAndDelete(surfboardId);
        if (!deleteSurfboard)
            return res.status(404).json({ message: 'Surfboard not found' });

        return res.json({ message: 'Surfboard deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getSurfboardById = async (req, res) => {

    const { surfboardId } = req.body;

    try {

        const surfboard = await Surfboard.findById(surfboardId);
        return res.json({ surfboard: surfboard });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

const getSurfboardsByFilter = async (req, res) => {

    const { type, color } = req.query;

    // if there were filters and then unchecked all of them
    if (typeof type === 'undefined' && typeof color === 'undefined')
        return getAllSurfboards(req, res);

    try {

        let query = {};

        // Build the query based on the available filters
        if (typeof type !== 'undefined') {
            query.type = { $in: type };
        }
        if (typeof color !== 'undefined') {
            query.color = { $in: color };
        }

        const surfboards = await Surfboard.find(query);
        return res.json({ surfboards: surfboards });
    }
    catch (error) {
        console.error('Failed to find surfboards:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {

    getSurfboardsPage,
    getAllSurfboards,
    createSurfboard,
    updateSurfboard,
    deleteSurfboard,
    getSurfboardById,
    getSurfboardsByFilter
};

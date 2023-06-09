const Surfboard = require('../models/SurfboardModel');


const getAllSurfboards = async (req, res) => {

    try {

        const surfboards = await Surfboard.find({});
        res.json(surfboards);
    } catch (err) {

        console.error('Failed to find surfboards:', err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {

    getAllSurfboards
}


/*
const Surfboard = require('../models/SurfboardModel');

// Get all surfboards
const getAllSurfboards = async (req, res) => {
    try {
        const surfboards = await Surfboard.find({});
        res.json(surfboards);
    } catch (error) {
        console.error('Failed to find surfboards:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Create a new surfboard (only accessible to admins)
const createSurfboard = async (req, res) => {
    const { company, model, price, image, color, type, tail, height, width, thick, volume } = req.body;

    try {
        // Check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Create a new surfboard object
        const newSurfboard = new Surfboard({
            company,
            model,
            price,
            image,
            color,
            type,
            tail,
            height,
            width,
            thick,
            volume
        });

        // Save the surfboard to the database
        await newSurfboard.save();

        res.status(201).json(newSurfboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a surfboard (only accessible to admins)
const updateSurfboard = async (req, res) => {
    const surfboardId = req.params.id;
    const { company, model, price, image, color, type, tail, height, width, thick, volume } = req.body;

    try {
        // Check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Find and update the surfboard
        const updatedSurfboard = await Surfboard.findByIdAndUpdate(
            surfboardId,
            { company, model, price, image, color, type, tail, height, width, thick, volume },
            { new: true }
        );

        if (!updatedSurfboard) {
            return res.status(404).json({ message: 'Surfboard not found' });
        }

        res.json(updatedSurfboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a surfboard (only accessible to admins)
const deleteSurfboard = async (req, res) => {
    const surfboardId = req.params.id;

    try {
        // Check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Find and delete the surfboard
        const deletedSurfboard = await Surfboard.findByIdAndDelete(surfboardId);

        if (!deletedSurfboard) {
            return res.status(404).json({ message: 'Surfboard not found' });
        }

        res.json({ message: 'Surfboard deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllSurfboards,
    createSurfboard,
    updateSurfboard,
    deleteSurfboard
};
*/
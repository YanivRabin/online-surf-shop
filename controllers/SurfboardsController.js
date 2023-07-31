const Surfboard = require('../models/SurfboardModel');
const path = require("path");


const getSurfboardsPage = (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/surfboards.html'))
};

const getAllSurfboards = async (req, res) => {

    try {
        const surfboards = await Surfboard.find({});
        return res.json({ surfboards: surfboards });
    } catch (error) {
        console.error('Failed to find surfboards:', error);
        return res.status(500).send('Internal Server Error');
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


        //Post NewSurfBoard To the Facebook page
        if (newSurfboard) {
            const message = `Check out our new SurfBoard from: ${company}! Model: ${model}.`;
            await postToFacebook(message);
        }

    // Save the surfboard to the database
        await newSurfboard.save();
        return res.status(201).json({ newSurfboard: newSurfboard });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const postToFacebook=async(postMessage)=> {
    const API_BASE = 'https://graph.facebook.com/v15.0';
    const userToken = 'EAASo4qcZA9GwBO72dQfyDQdsgHoBQK1zweEDxxiSJ7GajJv562KLOiSPuUBiEear0esZAzoqxEtZCdoJR0hUKpNFDGgtnxPTy1KCZC4JJ6ZCEntVqLZBJDb9jN7HAyApYPAArcZCsj9DtbRaemrtuZAon3s1bRGYGlKxHSyUqZCUsPIHgDrO6ZCsoeIAZDZD';

    try {
        const pageResp = await fetch(`${API_BASE}/me/accounts?access_token=${userToken}`);

        if (!pageResp.ok) {
            throw new Error(`Failed to get page access token: ${pageResp.statusText}`);
        }

        const pages = await pageResp.json();
        const page = pages.data[0];
        const pageToken = page.access_token;
        const pageId = page.id;

        const fbPostObj = {
            message: postMessage,
        };

        const postResp = await fetch(`${API_BASE}/${pageId}/feed`, {
            method: 'POST',
            body: JSON.stringify(fbPostObj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${pageToken}`,
            },
        });

        if (!postResp.ok) {
            const errorDetails = await postResp.json();
            console.error('Error details:', errorDetails);
            throw new Error(`Failed to post to Facebook: ${postResp.statusText}`);
        }

        console.log('Successfully posted to Facebook');
    } catch (error) {
        console.error(error);
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
    } catch (error) {
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
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getSurfboardById = async (req, res) => {

    const { surfboardId } = req.body;


    try {

        const surfboard = await Surfboard.findById(surfboardId);
        return res.json({ surfboard: surfboard });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

};

module.exports = {

    getSurfboardsPage,
    getAllSurfboards,
    createSurfboard,
    updateSurfboard,
    deleteSurfboard,
    getSurfboardById
};

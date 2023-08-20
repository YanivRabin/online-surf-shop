const Surfboard = require('../models/SurfboardModel');


// Get all surfboards
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
// Create a new surfboard (only accessible to admins)
const createSurfboard = async (req, res) => {
    const { company, model, price, image, type, tail  } = req.body;
    try {
        // Create a new surfboard object
        const newSurfboard = new Surfboard({
            company: company,
            model: model,
            price: price,
            image: image,
            type: type,
            tail: tail
        });
        //Post NewSurfBoard To the Facebook page
        if (newSurfboard) {
            const message = `Check out our new SurfBoard from: ${company}! Model: ${model}.`;
            await postToFacebook(message);
        }
        // Save the surfboard to the database
        await newSurfboard.save();
        return res.status(201).json({ newSurfboard: newSurfboard });
    }
    catch (error) {
        return res.status(201).json({ message: "error" });
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
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateSurfboard = async (req, res) => {
    const { _id, company, model, price, image, type, tail } = req.body;
    try {
        // Find and update the surfboard
        const updatedSurfboard = await Surfboard.findByIdAndUpdate(
            _id,
            { company, model, price, image, type, tail },
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
    const { type, company, tail } = req.query;
    // if there were filters and then unchecked all of them
    if (typeof type === 'undefined' && typeof company === 'undefined'&& typeof tail === 'undefined') {
        return getAllSurfboards(req, res);
    }
    try {
        let query = {};
        // Build the query based on the available filters
        if (typeof type !== 'undefined') {
            query.type = { $in: type };
        }
        if (typeof company !== 'undefined') {
            query.company = { $in: company };
        }
        if (typeof tail !== 'undefined') {
            query.tail = { $in: tail };
        }
        const surfboards = await Surfboard.find(query);
        return res.json({ surfboards: surfboards });
    }
    catch (error) {
        console.error('Failed to find surfboards:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const autoComplete = async (req, res) => {
    const { searchTerm } = req.query;
    try {
        const autocompleteSuggestions = await Surfboard.distinct('company', {
            company: { $regex: searchTerm, $options: 'i' }
        });
        res.json({ autocompleteSuggestions });
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    autoComplete,
    getAllSurfboards,
    createSurfboard,
    updateSurfboard,
    deleteSurfboard,
    getSurfboardById,
    getSurfboardsByFilter
};

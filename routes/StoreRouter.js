const router = require('express').Router();
const surfboardsController = require('../controllers/SurfboardsController');
const { isLoggedIn, isAdmin } = require("../controllers/AuthController");
const Store = require('../models/StoreModel');
const path = require('path');
const fs = require('fs');
const { GOOGLE_API_KEY } = require("../config/config");
const apiKey = GOOGLE_API_KEY;

// get the store page
router.get('/', async (req, res) => {
    if (req.session.isAdmin === true)
        return res.sendFile(path.join(__dirname, '../views/adminEdit.html'));

    return res.sendFile(path.join(__dirname, '../views/Shop.html'));
})
// get all
router.get('/surfboards', surfboardsController.getAllSurfboards);
// get surfboards by filter
router.get('/filterSurfboards', surfboardsController.getSurfboardsByFilter);
// create new surfboard
router.post('/createSurfboard', isLoggedIn, isAdmin, surfboardsController.createSurfboard);
// update surfboard
router.put('/updateSurfboard', isLoggedIn, isAdmin, surfboardsController.updateSurfboard);
// delete surfboard
router.delete('/deleteSurfboard', isLoggedIn, isAdmin, surfboardsController.deleteSurfboard);
// get store branches ( google map )
router.get('/branches', async (req, res) => {
    try {
        const branches = await Store.find();
        let dataScript = `<script>let branches = ${JSON.stringify(branches)};</script>`;
        let html = fs.readFileSync(path.join(__dirname, '../views/mapAndContact.html'), 'utf-8');
        html = html.replace('<script src="https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=initMap&language=en" async defer></script>'
            , dataScript + '<script src="https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=initMap&language=en" async defer></script>');
        res.send(html);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
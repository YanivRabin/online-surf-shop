const express = require('express');
const Store = require('../models/StoreModel');
const path = require('path');
const fs = require('fs'); // Add this line
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const branches = await Store.find();
        let dataScript = `<script>let branches = ${JSON.stringify(branches)};</script>`;
        let html = fs.readFileSync(path.join(__dirname, '../views/map.html'), 'utf-8');
        html = html.replace('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkVJDbLybIIsME5xfeB2YwkxIgX9-kgz4&callback=initMap" async defer></script>'
            , dataScript + '<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkVJDbLybIIsME5xfeB2YwkxIgX9-kgz4&callback=initMap" async defer></script>');
        res.send(html);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

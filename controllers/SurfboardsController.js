const path = require('path');

getSurfboardsPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/surfboards.html'));
};

module.exports = {

    getSurfboardsPage
}
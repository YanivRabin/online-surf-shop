const path = require('path');

getHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'));
};

redirectToSurfboards = (req, res) => {
    res.redirect('/surfboards');
};

module.exports = {

    getHomePage,
    redirectToSurfboards
}
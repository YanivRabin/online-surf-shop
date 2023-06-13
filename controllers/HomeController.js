const path = require('path');


const getHomePage = (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/home.html'));
};
const getChat = (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/chat.html'));
};

module.exports = {

    getHomePage,
    getChat
}
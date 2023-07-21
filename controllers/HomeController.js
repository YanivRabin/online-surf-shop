const path = require('path');


const getHomePage = (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/HomePage.html'));
};
const getChat = (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/chat.html'));
};

const getLogIn = (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/login.html'));
};

module.exports = {

    getHomePage,
    getChat,
    getLogIn
}
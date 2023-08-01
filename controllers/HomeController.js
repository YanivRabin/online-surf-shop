const path = require('path');
const fetch = require('node-fetch');

const getHomePage = (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/HomePage.html'));
};
const getChat = (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/chat.html'));
};

const getWeather = (req,res) =>{
    const city = 'Tel Aviv'; // Replace 'city_name' with the city you want to get weather data for
    fetch('http://api.weatherapi.com/v1/current.json?key=' + process.env.WEATHER_API_KEY + '&q=' + city)
        .then(response => response.json())
        .then(data => {
            var temperature = data.current.temp_c; // This gives temperature in Celsius
            var description = data.current.condition.text;

            return res.json({ temp: temperature, description: description });
        })
        .catch(err => res.status(500).json({ message: 'An error occurred', error: err }));
}

module.exports = {
    getHomePage,
    getChat,
    getWeather
}
const fetch  = require('node-fetch');
const path = require('path');

const getHomePage = async (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/HomePage.html'));
};

const getChat = async (req, res) => {
    return res.sendFile(path.join(__dirname, '../views/chat.html'));
};

const getWeather = async (req, res) => {
    try {
        const city = 'Tel Aviv';
        const forecast = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=3`);
        if (!forecast.ok) {
            return res.json({ message: 'An error occurred' });
        }
        const forecastData = await forecast.json();
        return res.json({ forecast: forecastData });
    }
    catch (err) {
        console.error('Error fetching weather data:', err.message);
        return res.status(500).json({ message: 'An error occurred', error: err.message });
    }
};

module.exports = { getHomePage, getChat, getWeather };

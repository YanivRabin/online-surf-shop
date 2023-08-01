const router          = require('express').Router();
const homeController  = require('../controllers/HomeController');

router.get('/', homeController.getHomePage);
router.get('/chat', homeController.getChat);
router.get('/weather', homeController.getWeather);

module.exports = router;
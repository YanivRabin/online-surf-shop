const router          = require('express').Router();
const homeController  = require('../controllers/HomeController');


// get home page
router.get('/', homeController.getHomePage);
// get chat page
router.get('/chat', homeController.getChat);

module.exports = router;
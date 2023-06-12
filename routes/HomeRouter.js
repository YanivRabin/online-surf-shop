const router          = require('express').Router();
const homeController  = require('../controllers/HomeController');
const path = require("path");


router.get('/', homeController.getHomePage);
router.get('/chat',homeController.getChat)

module.exports = router;
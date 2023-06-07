const router = require('express').Router();
const homeController = require('../controllers/HomeController');


router.route('/')
    .get(homeController.getHomePage)
    .post(homeController.redirectToSurfboards)


module.exports = router;
const router = require('express').Router();
const homeController = require('../controllers/HomeController');


router.get('/', homeController.getHomePage);
router.post('/login', homeController.loginUser);
router.post('/register', homeController.registerUser);

// router.route('/')
//     .get(homeController.getHomePage)
//     .post(homeController.registerUser)
//     .post(homeController.registerUser)
//     .post(homeController.loginUser)


module.exports = router;
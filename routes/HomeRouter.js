const router          = require('express').Router();
const homeController  = require('../controllers/HomeController');
// const { verifyToken, authorizeAdmin } = require('../middlewares/authMiddleware');


router.get('/', homeController.getHomePage);
// router.post('/login', homeController.loginUser);
// router.post('/register', homeController.registerUser);

module.exports = router;
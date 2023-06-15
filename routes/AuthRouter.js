const router = require("express").Router();
const loginController  = require("../controllers/AuthController");
const { isLoggedIn, isAdmin } = require("../controllers/AuthController");


// register, login and logout for user
router.post("/register", loginController.registerUser);
router.post("/login", loginController.loginUser);
router.post('/logout', loginController.logoutUser);

// receive all the users that register ( only for admin)
router.get('/allUsers',isLoggedIn, isAdmin, loginController.getAllUsers);

module.exports = router;
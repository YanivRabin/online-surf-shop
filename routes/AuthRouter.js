const router = require("express").Router();
const loginController  = require("../controllers/authController");


router.get("/register", loginController.registerForm);
router.post("/register", loginController.registerUser);

router.get("/login", loginController.loginForm);
router.post("/login", loginController.loginUser);

router.post('/logout', loginController.logoutUser);

module.exports = router;
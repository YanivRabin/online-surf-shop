const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { isLoggedIn } = require("../controllers/authController");


// get
// router.get('/api/cartItems', cartController.getCartItems);

// add
router.post('/add', isLoggedIn, cartController.addToCart);

// update
router.put('/update', isLoggedIn, cartController.updateCartItem);

// delete the specific item and update the cart
router.put('/remove', isLoggedIn, cartController.removeCartItem);

module.exports = router;
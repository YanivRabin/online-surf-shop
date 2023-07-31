const router = require('express').Router();
const cartController = require('../controllers/cartController');
const { isLoggedIn } = require("../controllers/AuthController");


// get items from cart
router.get('/getItems',isLoggedIn, cartController.getCartItems);
// add item to the cart
router.post('/add', isLoggedIn, cartController.addToCart);
// add or remove item count from the cart
router.put('/update', isLoggedIn, cartController.updateCartItem);
// delete the specific item and update the cart
router.put('/remove', isLoggedIn, cartController.removeCartItem);

module.exports = router;
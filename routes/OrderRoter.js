const router = require('express').Router();
const orderController = require('../controllers/orderController');
const { isLoggedIn, isAdmin } = require("../controllers/AuthController");


// get all the orders of specific user
router.post('/history', isLoggedIn, orderController.getUserOrders);

// get all the orders of everyone, only for admin
router.post('/allHistory', isLoggedIn, isAdmin, orderController.getAllOrders);

// complete an order
router.post('/completeOrder', isLoggedIn, orderController.completeOrder);

module.exports = router;
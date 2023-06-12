const router = require('express').Router();
const surfboardsController = require('../controllers/SurfboardsController');
const { isLoggedIn, isAdmin } = require("../controllers/authController");


router.get('/surfboards', isLoggedIn, surfboardsController.getAllSurfboards);
router.post('/surfboards', isLoggedIn, isAdmin, surfboardsController.createSurfboard);
router.put('/surfboards', isLoggedIn, isAdmin, surfboardsController.updateSurfboard);
router.delete('/surfboards', isLoggedIn, isAdmin, surfboardsController.deleteSurfboard);

// router.route('/:id')
//     // update and delete surfboard only if you admin
//     .put(verifyToken, authorizeAdmin, surfboardsController.updateSurfboard)
//     .delete(verifyToken, authorizeAdmin, surfboardsController.deleteSurfboard)

module.exports = router;
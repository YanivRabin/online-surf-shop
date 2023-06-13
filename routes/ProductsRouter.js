const router = require('express').Router();
const surfboardsController = require('../controllers/SurfboardsController');
const { isLoggedIn, isAdmin } = require("../controllers/authController");


// get the html and upload the data
router.get('/surfboards', surfboardsController.getSurfboardsPage);
router.get('/api/surfboards', surfboardsController.getAllSurfboards);

// create
router.post('/surfboards', isLoggedIn, isAdmin, surfboardsController.createSurfboard);

// update
router.post('/surfboards/id', isLoggedIn, isAdmin, surfboardsController.getSurfboardById);
router.put('/surfboards', isLoggedIn, isAdmin, surfboardsController.updateSurfboard);

// delete
router.delete('/surfboards', isLoggedIn, isAdmin, surfboardsController.deleteSurfboard);

module.exports = router;
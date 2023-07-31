const router = require('express').Router();
const surfboardsController = require('../controllers/SurfboardsController');
const { isLoggedIn, isAdmin } = require("../controllers/AuthController");


// get the html and upload the data
router.get('/', surfboardsController.getSurfboardsPage);
router.get('/surfboards', surfboardsController.getAllSurfboards);
// receive surfboards by filter
router.get('/filterSurfboards', surfboardsController.getSurfboardsByFilter);
// create new surfboard
router.post('/createSurfboard', isLoggedIn, isAdmin, surfboardsController.createSurfboard);
// get a single surfboard and update
router.post('/getOneSurfboard', surfboardsController.getSurfboardById);
router.put('/updateSurfboard', isLoggedIn, isAdmin, surfboardsController.updateSurfboard);
// delete exist surfboard
router.delete('/deleteSurfboard', isLoggedIn, isAdmin, surfboardsController.deleteSurfboard);

module.exports = router;
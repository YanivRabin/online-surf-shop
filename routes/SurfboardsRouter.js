const router = require('express').Router();
const surfboardsController = require('../controllers/SurfboardsController');


router.get('/', surfboardsController.getSurfboardsPage);


module.exports = router;
const router = require('express').Router();
const surfboardsController = require('../controllers/SurfboardsController');


router.route('/')
    .get(surfboardsController.getSurfboardsPage);


// router.get('/', surfboardsController.createSurfboard);


module.exports = router;
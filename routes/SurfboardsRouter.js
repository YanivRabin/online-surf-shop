const router = require('express').Router();
const surfboardsController = require('../controllers/SurfboardsController');
const { verifyToken, authorizeAdmin } = require('../middlewares/authMiddleware');


router.route('/')
    // get all surfboards data
    .get(surfboardsController.getAllSurfboards)
    // create surfboard only if you admin
    .post(verifyToken, authorizeAdmin, surfboardsController.createSurfboard);

router.route('/:id')
    // update and delete surfboard only if you admin
    .put(verifyToken, authorizeAdmin, surfboardsController.updateSurfboard)
    .delete(verifyToken, authorizeAdmin, surfboardsController.deleteSurfboard)

module.exports = router;
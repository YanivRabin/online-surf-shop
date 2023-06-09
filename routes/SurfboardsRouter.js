const router = require('express').Router();
const surfboardsController = require('../controllers/SurfboardsController');
// const { authenticateToken, authorizeAdmin } = require('../middlewares/authMiddleware');


router.route('/')
    .get(surfboardsController.getAllSurfboards)
//     .post(authenticateToken, authorizeAdmin, surfboardsController.createSurfboard);
//
// router.route('/:id')
//     .put(authenticateToken, authorizeAdmin, surfboardsController.updateSurfboard)
//     .delete(authenticateToken, authorizeAdmin, surfboardsController.deleteSurfboard)

module.exports = router;
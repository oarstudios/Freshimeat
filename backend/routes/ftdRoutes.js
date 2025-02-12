const express = require('express');
const router = express.Router();
const ftdController = require('../controllers/ftdController');

// Define routes
router.post('/', ftdController.createFtd);
router.get('/', ftdController.getAllFtds);
router.get('/:id', ftdController.getFtdById);
router.put('/:id', ftdController.updateFtd);
router.delete('/:id', ftdController.deleteFtd);

module.exports = router;

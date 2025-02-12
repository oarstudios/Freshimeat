const express = require('express');
const router = express.Router();
const {
    signup,
    login,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
    addToCart,
    removeFromCart,
    updateCart,
    addAddress
} = require('../controllers/userController');
const requireAuth = require('../middlewares/requireAuth');

// User Routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getAllUsers);

// Cart Routes
router.post('/:id/cart', requireAuth, addToCart);
router.put('/:id/cart', requireAuth, updateCart);
router.delete('/:id/cart', requireAuth, removeFromCart);

// Address Routes
router.post('/:id/address', requireAuth, addAddress);

module.exports = router;

const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// Generate 6-digit User ID from MongoDB ObjectId
const generateUserId = (objectId) => {
    return objectId.toString().slice(-6);
};

// Generate JWT Token
const createToken = (user) => {
    return jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Signup Controller
const signup = async (req, res) => {
    try {
        const { username, email, password, userType } = req.body;
        
        const user = await User.signup(null, username, email, password, userType);
        user.userId = generateUserId(user._id);
        await user.save();

        const token = createToken(user);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = createToken(user);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get User by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update User
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ error: "User not found" });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add to Cart
const addToCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, quantity, price } = req.body;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.cart.push({ productId, quantity, price });
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { productId } = req.body;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Cart
const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { cart } = req.body;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.cart = cart;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add Address with a limit of 3
const addAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, address, landmark, state, city, pincode } = req.body;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        if (user.addresses.length >= 3) {
            return res.status(400).json({ error: "You can only add up to 3 addresses." });
        }

        user.addresses.push({ firstName, lastName, address, landmark, state, city, pincode });
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
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
};

const Ftd = require('../models/FtdModel'); // Import the model
const mongoose = require('mongoose');

// Create a new Ftd document
exports.createFtd = async (req, res) => {
    try {
        const { product } = req.body;

        if (!Array.isArray(product) || product.length > 4) {
            return res.status(400).json({ message: "Product array must contain at most 4 items." });
        }

        const newFtd = new Ftd({ product });
        await newFtd.save();
        res.status(201).json(newFtd);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all Ftd documents
exports.getAllFtds = async (req, res) => {
    try {
        const ftds = await Ftd.find().populate('product');
        res.status(200).json(ftds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single Ftd document by ID
exports.getFtdById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const ftd = await Ftd.findById(id).populate('product');
        if (!ftd) {
            return res.status(404).json({ message: "Ftd not found" });
        }

        res.status(200).json(ftd);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an Ftd document by ID
exports.updateFtd = async (req, res) => {
    try {
        const { id } = req.params;
        const { product } = req.body;

        if (!Array.isArray(product) || product.length > 4) {
            return res.status(400).json({ message: "Product array must contain at most 4 items." });
        }

        const updatedFtd = await Ftd.findByIdAndUpdate(id, { product }, { new: true, runValidators: true }).populate('product');
        if (!updatedFtd) {
            return res.status(404).json({ message: "Ftd not found" });
        }

        res.status(200).json(updatedFtd);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an Ftd document by ID
exports.deleteFtd = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFtd = await Ftd.findByIdAndDelete(id);
        if (!deletedFtd) {
            return res.status(404).json({ message: "Ftd not found" });
        }

        res.status(200).json({ message: "Ftd deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const Product = require('../models/ProductModel');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ error: "Product not found" });

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ error: "Product not found" });

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ error: "Product not found" });

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getProductsByProductTag = async (req, res) => {
    try {
        const { productTag } = req.params;
        const products = await Product.find({ productTag });
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get bestsellers
const getBestsellers = async (req, res) => {
    try {
        const bestsellers = await Product.find({ bestseller: true });
        res.status(200).json(bestsellers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductsByProductTag,
    getBestsellers
};

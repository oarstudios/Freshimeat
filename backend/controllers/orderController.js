const Billing = require('../models/OrderModel'); // Adjust path as needed

// Create a new billing document
exports.createBilling = async (req, res) => {
    try {
      const { userId } = req.params;
      const { 
        products, 
        email, 
        shippingAddress,
        status,
        billId,
        billPrice,
        time
      } = req.body;
  
      // Ensure that products array contains the necessary fields
      const formattedProducts = products.map(item => ({
        product: item?.product,
        quantity: item?.quantity,
        price: item?.price
      }));
  
      // Create the new Billing document with formatted products
      const billingData = {
        userId,
        products: formattedProducts,
        email,
        shippingAddress, // Directly use the shippingAddress object
        status,
        billId,
        billPrice,
        time
      };
  
      const newBilling = new Billing(billingData);
  
      // Save the Billing document
      const savedBilling = await newBilling.save();
  
      res.status(201).json({
        success: true,
        message: 'Billing created successfully',
        data: savedBilling, // Return the populated billing data with product details
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create billing',
        error: error.message,
      });
    }
};

// Get all billing documents
exports.getAllBillings = async (req, res) => {
    try {
        const billings = await Billing.find()
            .populate('userId', 'name email') // Adjust fields as needed
            .populate('products.product', 'name price');
        res.status(200).json({
            success: true,
            data: billings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch billings',
            error: error.message,
        });
    }
};

// Get a billing document by ID
exports.getBillingById = async (req, res) => {
    try {
        const { id } = req.params;
        const billing = await Billing.findById(id)
            .populate('userId', 'name email')
            .populate('products.product', 'name price');

        if (!billing) {
            return res.status(404).json({
                success: false,
                message: 'Billing not found',
            });
        }

        res.status(200).json({
            success: true,
            data: billing,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch billing',
            error: error.message,
        });
    }
};

// Update a billing document by ID
exports.updateBilling = async (req, res) => {
    try {
        const { id, userId } = req.params;
        const updates = { ...req.body, userId };
        const updatedBilling = await Billing.findByIdAndUpdate(id, updates, { new: true })
            .populate('userId', 'name email')
            .populate('products.product', 'name price');

        if (!updatedBilling) {
            return res.status(404).json({
                success: false,
                message: 'Billing not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Billing updated successfully',
            data: updatedBilling,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update billing',
            error: error.message,
        });
    }
};

// Delete a billing document by ID
exports.deleteBilling = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBilling = await Billing.findByIdAndDelete(id);

        if (!deletedBilling) {
            return res.status(404).json({
                success: false,
                message: 'Billing not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Billing deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete billing',
            error: error.message,
        });
    }
};

const Discount = require('../models/Discount');

// Controller for handling discount data
const discountController = {
  // Save form data to the database
  saveDiscounts: async (req, res) => {
    try {
      const formData = req.body; // Expecting an array of discount data

      // Validate input
      if (!Array.isArray(formData)) {
        return res.status(400).json({ message: 'Invalid data format. Expected an array.' });
      }

      // Save data to the database
      const savedData = await Discount.insertMany(formData);

      // Respond with success
      res.status(201).json({ message: 'Data saved successfully!', data: savedData });
    } catch (error) {
      console.error('Error saving data:', error.message);
      res.status(500).json({ message: 'Failed to save data', error: error.message });
    }
  },

  // Fetch all discount data
  getAllDiscounts: async (req, res) => {
    try {
      const discounts = await Discount.find();
      res.status(200).json({ message: 'Data retrieved successfully!', data: discounts });
    } catch (error) {
      console.error('Error retrieving data:', error.message);
      res.status(500).json({ message: 'Failed to retrieve data', error: error.message });
    }
  },

  // Edit a discount
  editDiscount: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;

      const updatedDiscount = await Discount.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
        runValidators: true, // Validate inputs before updating
      });

      if (!updatedDiscount) {
        return res.status(404).json({ message: 'Discount not found' });
      }

      res.status(200).json({ message: 'Discount updated successfully', data: updatedDiscount });
    } catch (error) {
      console.error('Error updating discount:', error.message);
      res.status(500).json({ message: 'Failed to update discount', error: error.message });
    }
  },

  // Delete a discount
  deleteDiscount: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedDiscount = await Discount.findByIdAndDelete(id);

      if (!deletedDiscount) {
        return res.status(404).json({ message: 'Discount not found' });
      }

      res.status(200).json({ message: 'Discount deleted successfully' });
    } catch (error) {
      console.error('Error deleting discount:', error.message);
      res.status(500).json({ message: 'Failed to delete discount', error: error.message });
    }
  },
};

module.exports = discountController;
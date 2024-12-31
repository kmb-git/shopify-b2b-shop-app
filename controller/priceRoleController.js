const PriceRole = require('./path-to-priceRole-model'); // Import the PriceRole model

// Controller for PriceRole
const priceRoleController = {
  // Create a new PriceRole
  createPriceRole: async (req, res) => {
    try {
      const { all_price, is_collection, name, discount_type, discount_value, tag } = req.body;

      // Create a new PriceRole instance
      const newPriceRole = new PriceRole({
        all_price,
        is_collection,
        name,
        discount_type,
        discount_value,
        tag,
      });

      // Save to database
      const savedPriceRole = await newPriceRole.save();
      res.status(201).json({ message: 'PriceRole created successfully!', data: savedPriceRole });
    } catch (error) {
      res.status(500).json({ message: 'Error creating PriceRole', error: error.message });
    }
  },

  // Fetch all PriceRoles
  getAllPriceRoles: async (req, res) => {
    try {
      const priceRoles = await PriceRole.find(); // Fetch all records
      res.status(200).json(priceRoles);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching PriceRoles', error: error.message });
    }
  },

  // Fetch a single PriceRole by ID
  getPriceRoleById: async (req, res) => {
    try {
      const { id } = req.params;
      const priceRole = await PriceRole.findById(id); // Find by ID
      if (!priceRole) {
        return res.status(404).json({ message: 'PriceRole not found' });
      }
      res.status(200).json(priceRole);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching PriceRole', error: error.message });
    }
  },

  // Update a PriceRole by ID
  updatePriceRole: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedPriceRole = await PriceRole.findByIdAndUpdate(id, updates, {
        new: true, // Return updated document
        runValidators: true, // Validate fields before updating
      });

      if (!updatedPriceRole) {
        return res.status(404).json({ message: 'PriceRole not found' });
      }

      res.status(200).json({ message: 'PriceRole updated successfully!', data: updatedPriceRole });
    } catch (error) {
      res.status(500).json({ message: 'Error updating PriceRole', error: error.message });
    }
  },

  // Delete a PriceRole by ID
  deletePriceRole: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPriceRole = await PriceRole.findByIdAndDelete(id);

      if (!deletedPriceRole) {
        return res.status(404).json({ message: 'PriceRole not found' });
      }

      res.status(200).json({ message: 'PriceRole deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting PriceRole', error: error.message });
    }
  },
};

module.exports = priceRoleController;
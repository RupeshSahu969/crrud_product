const Item = require('../models/productModel');

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items', error: err.message });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error (e.g. email already exists)
      return res.status(400).json({ message: 'Duplicate field value', field: err.keyValue });
    }
    res.status(500).json({ message: 'Error creating item', error: err.message });
  }
};

// Update an existing item
exports.updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating item', error: err.message });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item', error: err.message });
  }
};

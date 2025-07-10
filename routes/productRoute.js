const express = require('express');
const path = require('path'); 
const fs = require('fs');     
const Product = require('../models/userModel');
const { singleUpload } = require('../middleware/upload');


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });
    res.json(product);
  } catch (err) {
    console.error(`Error fetching product ${req.params.id}:`, err);
    res.status(500).json({ error: 'Failed to fetch product.' });
  }
});

router.post('/', singleUpload('image'), async (req, res) => {
  try {
    const { name, brand, description, certification, category } = req.body;
    if (!name || !brand || !description || !category) {
      return res.status(400).json({ error: 'Please fill all required fields.' });
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null;

    if (!imageUrl) return res.status(400).json({ error: 'Image is required.' });

    const newProduct = new Product({
      name,
      brand,
      description,
      certification,
      category,
      image: imageUrl,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Server error while creating product.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });

    if (product.image) {
      const filename = product.image.split('/uploads/')[1];
      const filePath = path.join(__dirname, '..', 'uploads', filename);
      fs.unlink(filePath, (err) => {
        if (err) console.warn('Failed to delete image file:', err.message);
      });
    }

    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product.' });
  }
});

module.exports = router;

const express = require('express');
const Feedback = require('../models/feedbackModel');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { productId, name, message } = req.body;

    if (!productId || !name || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const newFeedback = new Feedback({ productId, name, message });
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'An error occurred while submitting feedback.' });
  }
});

module.exports = router;

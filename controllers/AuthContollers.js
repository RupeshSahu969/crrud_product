const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });

  res.json({ token, user: { id: user._id, email: user.email } });
};

// For development testing only
exports.register = async (req, res) => {
  const { email, password, username } = req.body; // Ensure username is provided in the request

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Email, password, and username are required' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed, username }); // Save username

  try {
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Error registering user:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};



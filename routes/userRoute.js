const express = require('express');
const router = express.Router();
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/userControllers');

const auth = require('../middleware/authMiddleware');

router.get('/', auth, getItems);
router.post('/', auth, createItem);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;

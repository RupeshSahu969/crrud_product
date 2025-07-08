const express = require('express');
const router = express.Router();
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getItemById,
} = require('../controllers/userControllers');

const auth = require('../middleware/authMiddleware');

router.get('/', auth, getItems);
router.post('/', auth, createItem);
router.get('/:id', auth, getItemById);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;

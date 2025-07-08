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

router.get('/', getItems);
router.post('/',  createItem);
router.get('/:id',  getItemById);
router.put('/:id',  updateItem);
router.delete('/:id',  deleteItem);

module.exports = router;

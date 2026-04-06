const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateCardBody, validateId } = require('../middlewares/validation');
const {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
} = require('../controllers/clothingItems');

// Public routes
router.get('/', getItems);

// Protected routes
router.use(auth);

router.post('/', validateCardBody, createItem);
router.put('/:itemId/likes', validateId, likeItem);
router.delete('/:itemId/likes', validateId, dislikeItem);
router.delete('/:itemId', validateId, deleteItem);

module.exports = router;

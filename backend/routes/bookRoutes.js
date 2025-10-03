const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { addBook, getBooks, getBookDetails, updateBook, deleteBook } = require('../controllers/bookController');

router.post('/', protect, addBook);
router.get('/', getBooks);
router.get('/:id', getBookDetails);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;

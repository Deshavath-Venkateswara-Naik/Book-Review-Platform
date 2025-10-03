const Book = require('../models/Book');
const Review = require('../models/Review');
const mongoose = require('mongoose');
exports.addBook = async (req, res) => {
    try {
        const book = await Book.create({ ...req.body, addedBy: req.user._id });
        res.status(201).json(book);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * GET /api/books
 * Query params:
 *  - page (default 1)
 *  - limit (default 5)
 *  - search (title or author)
 *  - genre
 *  - sort (yearAsc | yearDesc | ratingAsc | ratingDesc)
 */
exports.getBooks = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || 1));
    const limit = Math.max(1, parseInt(req.query.limit || 5));
    const search = (req.query.search || '').trim();
    const genre = (req.query.genre || '').trim();
    const sort = req.query.sort || '';

    // Build match stage
    const match = {};
    if (search) {
      // case-insensitive regex match on title or author
      match.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    if (genre) match.genre = genre;

    // Aggregation pipeline to compute average rating and paginate
    const pipeline = [
      { $match: match },
      // Left-join reviews
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'bookId',
          as: 'reviews'
        }
      },
      // Compute avgRating and reviewsCount
      {
        $addFields: {
          avgRating: { $cond: [{ $gt: [{ $size: '$reviews' }, 0] }, { $avg: '$reviews.rating' }, null] },
          reviewsCount: { $size: '$reviews' }
        }
      },
    ];

    // Apply sorting
    if (sort === 'yearAsc') pipeline.push({ $sort: { year: 1, createdAt: -1 } });
    else if (sort === 'yearDesc') pipeline.push({ $sort: { year: -1, createdAt: -1 } });
    else if (sort === 'ratingAsc') pipeline.push({ $sort: { avgRating: 1, createdAt: -1 } });
    else if (sort === 'ratingDesc') pipeline.push({ $sort: { avgRating: -1, createdAt: -1 } });
    else pipeline.push({ $sort: { createdAt: -1 } }); // default

    // Facet for pagination + total count
    pipeline.push({
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [{ $skip: (page - 1) * limit }, { $limit: limit }]
      }
    });

    const result = await Book.aggregate(pipeline);
    const total = result[0].metadata[0] ? result[0].metadata[0].total : 0;
    const books = result[0].data;

    res.json({
      books,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

/**
 * GET /api/books/:id
 * Return book + reviews + avgRating + rating distribution
 */
exports.getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) return res.status(400).json({ message: 'Invalid book id' });

    const book = await Book.findById(bookId).populate('addedBy', 'name email');
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Get reviews and average
    const reviews = await Review.find({ bookId: book._id }).populate('userId', 'name email');
    const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : null;

    // Rating distribution (counts for 1..5)
    const dist = [1,2,3,4,5].map(star => ({
      star,
      count: reviews.filter(r => r.rating === star).length
    }));

    res.json({ book, reviews, avgRating: avgRating ? Number(avgRating.toFixed(1)) : null, ratingDistribution: dist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateBook = async (req,res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) return res.status(404).json({ message: 'Book not found' });
        if(book.addedBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Unauthorized' });
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteBook = async (req,res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book) return res.status(404).json({ message: 'Book not found' });
        if(book.addedBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Unauthorized' });
        await book.remove();
        res.json({ message: 'Book deleted' });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

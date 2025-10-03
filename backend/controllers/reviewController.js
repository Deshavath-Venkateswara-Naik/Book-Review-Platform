const Review = require('../models/Review');

exports.addReview = async (req,res) => {
    try {
        const { bookId, rating, reviewText } = req.body;
        const review = await Review.create({ bookId, rating, reviewText, userId: req.user._id });
        res.status(201).json(review);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateReview = async (req,res) => {
    try {
        const review = await Review.findById(req.params.id);
        if(!review) return res.status(404).json({ message: 'Review not found' });
        if(review.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Unauthorized' });
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new:true });
        res.json(updatedReview);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteReview = async (req,res) => {
    try {
        const review = await Review.findById(req.params.id);
        if(!review) return res.status(404).json({ message: 'Review not found' });
        if(review.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Unauthorized' });
        await review.remove();
        res.json({ message: 'Review deleted' });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
};

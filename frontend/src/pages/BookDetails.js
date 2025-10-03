import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import API from '../utils/api';
import ReviewCard from '../components/ReviewCard';
import { AuthContext } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(null);
  const [ratingDistribution, setRatingDistribution] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, reviewText: '' });

  const fetchDetails = async () => {
    const res = await API.get(`/books/${id}`);
    setBook(res.data.book);
    setReviews(res.data.reviews || []);
    setAvgRating(res.data.avgRating);
    setRatingDistribution(res.data.ratingDistribution || []);
  };

  useEffect(() => { fetchDetails(); }, [id]);

  const handleReviewSubmit = async e => {
    e.preventDefault();
    await API.post('/reviews', { bookId: id, rating: Number(newReview.rating), reviewText: newReview.reviewText });
    setNewReview({ rating: 5, reviewText: '' });
    fetchDetails();
  };

  if (!book) return <p className="text-center mt-10 text-gray-500 dark:text-gray-300">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 space-y-8">
      {/* Book Info */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{book.title}</h2>
        <p className="text-gray-500 dark:text-gray-300 mt-1">{book.author} • {book.year}</p>
        <p className="mt-4 text-gray-700 dark:text-gray-200">{book.description}</p>
        <p className="mt-4 font-semibold text-blue-600 dark:text-blue-400">
          Average Rating: {avgRating ?? 'No ratings yet'}
        </p>
      </div>

      {/* Rating Distribution Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">Rating Distribution</h3>
        <div className="w-full h-60">
          <ResponsiveContainer>
            <BarChart data={ratingDistribution}>
              <XAxis dataKey="star" stroke="#6B7280" />
              <YAxis allowDecimals={false} stroke="#6B7280" />
              <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="#3b82f6" radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Add Review */}
      {user && (
        <form 
          onSubmit={handleReviewSubmit} 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="font-bold text-xl text-gray-900 dark:text-white">Add Your Review</h3>
          <select 
            value={newReview.rating} 
            onChange={e => setNewReview({...newReview, rating: e.target.value})} 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}⭐</option>)}
          </select>
          <textarea 
            value={newReview.reviewText} 
            onChange={e => setNewReview({...newReview, reviewText: e.target.value})} 
            placeholder="Write your review..." 
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600 resize-none h-28"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
          >
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="font-bold text-xl text-gray-900 dark:text-white">User Reviews</h3>
        {reviews.length > 0 ? reviews.map(r => <ReviewCard key={r._id} review={r} />) 
        : <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>}
      </div>
    </div>
  );
};

export default BookDetails;

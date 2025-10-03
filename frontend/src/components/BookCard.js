import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between hover:-translate-y-1 transform">
            {/* Book Title */}
            <h2 className="font-extrabold text-2xl text-gray-900 dark:text-white mb-2 truncate">{book.title}</h2>
            
            {/* Author & Year */}
            <p className="text-gray-500 dark:text-gray-300 mb-4">{book.author} • {book.year}</p>
            
            {/* Description */}
            <p className="text-gray-700 dark:text-gray-200 mb-6 line-clamp-3">{book.description}</p>
            
            {/* View Details Button */}
            <Link 
                to={`/books/${book._id}`} 
                className="self-start px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-colors duration-300 font-semibold"
            >
                View Details
            </Link>
        </div>
    )
};

export default BookCard;

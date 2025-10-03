import { useEffect, useState } from 'react';
import API from '../utils/api';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';

const genres = ['', 'Fiction', 'Non-Fiction', 'Science', 'History', 'Biography'];

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('page', page);
      if (search) params.append('search', search);
      if (genre) params.append('genre', genre);
      if (sort) params.append('sort', sort);

      const res = await API.get(`/books?${params.toString()}`);
      setBooks(res.data.books);
      setCurrentPage(res.data.currentPage || 1);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(1); }, [search, genre, sort]);

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4 space-y-3 md:space-y-0">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Books</h2>
        <Link 
          to="/books/add" 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Add Book
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search by title or author" 
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <select 
          value={genre} 
          onChange={e => setGenre(e.target.value)} 
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          {genres.map(g => <option key={g} value={g}>{g || 'All Genres'}</option>)}
        </select>
        <select 
          value={sort} 
          onChange={e => setSort(e.target.value)} 
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="">Sort</option>
          <option value="yearAsc">Year ↑</option>
          <option value="yearDesc">Year ↓</option>
          <option value="ratingDesc">Rating ↓</option>
          <option value="ratingAsc">Rating ↑</option>
        </select>
      </div>

      {/* Books Grid */}
      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-300 mt-10">Loading...</p>
      ) : (
        <>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map(b => <BookCard key={b._id} book={b} />)}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-300">No books found.</p>
          )}

          {/* Pagination */}
          <div className="mt-8">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={fetchBooks} />
          </div>
        </>
      )}
    </div>
  );
};

export default BookList;

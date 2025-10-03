import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../utils/api';
import BookCard from '../components/BookCard';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if(user){
            API.get('/books').then(res => {
                const myBooks = res.data.books.filter(b => b.addedBy._id === user._id);
                setBooks(myBooks);
            });
        }
    }, [user]);

    if(!user) return <p className="text-center mt-10 text-gray-500 dark:text-gray-300">Please login to view profile</p>;

    return (
        <div className="max-w-5xl mx-auto mt-10 px-4 space-y-6">
            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{user.name}</h2>
                    <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
                    <p className="mt-2 text-gray-700 dark:text-gray-200">Books Added: {books.length}</p>
                </div>
            </div>

            {/* My Books Section */}
            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Books</h3>
                {books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map(book => <BookCard key={book._id} book={book} />)}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">You haven't added any books yet.</p>
                )}
            </div>
        </div>
    )
};

export default Profile;

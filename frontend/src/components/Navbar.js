import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const { dark, toggle } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    }

    return (
        <nav className={`flex justify-between items-center px-6 py-4 shadow-md transition-colors duration-300
            ${dark ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white'}`}>
            
            {/* Logo / Brand */}
            <Link 
                to="/" 
                className="text-2xl font-extrabold tracking-tight hover:text-yellow-300 transition-colors duration-300"
            >
                BookReview
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="font-medium">{user.name}</span>
                        <Link 
                            to="/profile" 
                            className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                        >
                            Profile
                        </Link>
                        <button 
                            onClick={handleLogout} 
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg shadow text-white font-medium transition-all duration-300"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link 
                            to="/login" 
                            className="px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup" 
                            className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white font-medium transition-all duration-300"
                        >
                            Signup
                        </Link>
                    </>
                )}

                {/* Theme Toggle Button */}
                <button 
                    onClick={toggle} 
                    className={`ml-2 px-3 py-1 rounded-lg border font-medium transition-colors duration-300
                        ${dark ? 'border-gray-300 hover:bg-gray-700' : 'border-white hover:bg-white hover:text-gray-900'}`}
                >
                    {dark ? 'Light' : 'Dark'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

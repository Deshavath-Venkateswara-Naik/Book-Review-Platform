import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email:'', password:'' });
    const [error, setError] = useState('');

    const handleChange = e => setForm({...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', form);
            loginUser(res.data);
            navigate('/');
        } catch(err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        value={form.email} 
                        onChange={handleChange} 
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Password" 
                        value={form.password} 
                        onChange={handleChange} 
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    )
}

export default Login;

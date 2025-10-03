import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const AddEditBook = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({ title:'', author:'', description:'', genre:'', year:'' });

    useEffect(() => {
        if(id){
            API.get(`/books/${id}`).then(res => setForm(res.data.book));
        }
    }, [id]);

    const handleChange = e => setForm({...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if(id) await API.put(`/books/${id}`, form);
            else await API.post('/books', form);
            navigate('/');
        } catch(err) { console.log(err); }
    }

    if(!user) return (
        <p className="text-center text-red-500 mt-10 font-semibold">
            Please login to add/edit book
        </p>
    );

    return (
        <div className="max-w-lg mx-auto mt-12 p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 text-center">
                {id ? 'Edit Book' : 'Add Book'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <input 
                    name="title" 
                    placeholder="Title" 
                    value={form.title} 
                    onChange={handleChange} 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input 
                    name="author" 
                    placeholder="Author" 
                    value={form.author} 
                    onChange={handleChange} 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input 
                    name="genre" 
                    placeholder="Genre" 
                    value={form.genre} 
                    onChange={handleChange} 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input 
                    name="year" 
                    type="number" 
                    placeholder="Published Year" 
                    value={form.year} 
                    onChange={handleChange} 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    value={form.description} 
                    onChange={handleChange} 
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 resize-none h-32"
                />

                <button 
                    type="submit" 
                    className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                >
                    {id ? 'Update' : 'Add'} Book
                </button>
            </form>
        </div>
    )
};

export default AddEditBook;

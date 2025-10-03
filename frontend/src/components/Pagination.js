const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center space-x-2 mt-6">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg font-medium transition-colors duration-300 
                    ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-blue-100'}`}
            >
                &laquo;
            </button>

            {/* Page Numbers */}
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 
                        ${page === currentPage 
                            ? 'bg-blue-500 text-white shadow-lg scale-105' 
                            : 'bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`
                    }
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg font-medium transition-colors duration-300 
                    ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-200 hover:bg-blue-100'}`}
            >
                &raquo;
            </button>
        </div>
    )
};

export default Pagination;

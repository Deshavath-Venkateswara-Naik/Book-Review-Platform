const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 my-3">
            {/* Header: User Name & Rating */}
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900 dark:text-white">{review.userId.name}</span>
                <span className="text-yellow-500 font-bold">{review.rating}⭐</span>
            </div>

            {/* Review Text */}
            <p className="text-gray-700 dark:text-gray-200 line-clamp-3">
                {review.reviewText}
            </p>
        </div>
    )
};

export default ReviewCard;

import React from 'react';
import { PackageReview } from '../../../data/reviews';
import { Star, ThumbsUp, Check, Image as ImageIcon } from 'lucide-react';

interface ReviewsProps {
  reviews: PackageReview[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Customer Reviews</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= averageRating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{averageRating.toFixed(1)} out of 5</span>
            </div>
            <p className="text-gray-600 mt-1">Based on {reviews.length} reviews</p>
          </div>
          <div className="flex items-center justify-end">
            <button className="btn btn-primary">Write a Review</button>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-semibold text-lg">{review.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-600">{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
              {review.verified && (
                <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <Check className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Verified Stay</span>
                </div>
              )}
            </div>

            <p className="text-gray-700 mb-4">{review.content}</p>

            {/* Review Photos */}
            {review.imageIds && review.imageIds.length > 0 && (
              <div className="mb-4">
                <div className="flex gap-2 flex-wrap">
                  {review.imageIds.map((imageId, index) => (
                    <div key={imageId} className="relative h-20 w-20 rounded-lg overflow-hidden">
                      <img
                        src={`/images/reviews/${imageId}`}
                        alt={`Review photo ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {review.tagIds && review.tagIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {review.tagIds.map((tagId) => (
                  <span
                    key={tagId}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tagId}
                  </span>
                ))}
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center gap-4 text-gray-600">
              <button className="flex items-center gap-1 hover:text-gray-900">
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful ({review.likes})</span>
              </button>
              {review.imageIds && review.imageIds.length > 0 && (
                <button className="flex items-center gap-1 hover:text-gray-900">
                  <ImageIcon className="h-4 w-4" />
                  <span>Photos ({review.imageIds.length})</span>
                </button>
              )}
            </div>

            {/* Response from property */}
            {review.response && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-sm mb-2">Response from {review.response.from}</h5>
                  <p className="text-gray-600 text-sm">{review.response.content}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Responded on {new Date(review.response.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
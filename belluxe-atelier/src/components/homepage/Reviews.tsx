import React from 'react';
import { Review } from '@/types/review.types';

interface ReviewsProps {
  data: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ data }) => {
  return (
    <section className="reviews-section">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
      <div className="reviews-list">
        {data.map((review) => (
          <div key={review.id} className="review-item border p-4 mb-4 rounded">
            <div className="review-header flex justify-between">
              <span className="review-user font-semibold">{review.user}</span>
              <span className="review-rating text-yellow-500">{'★'.repeat(review.rating)}</span>
            </div>
            <p className="review-content mt-2">{review.content}</p>
            <span className="review-date text-gray-500 text-sm">{review.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
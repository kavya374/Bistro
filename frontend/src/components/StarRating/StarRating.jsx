import React from 'react';
import './StarRating.css'; // Optional for spacing

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);   // Number of full stars
  const hasHalfStar = rating % 1 >= 0.5;  // One half star?
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>
      ))}
      {hasHalfStar && <i className="bi bi-star-half text-warning"></i>}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="bi bi-star text-warning"></i>
      ))}
    </div>
  );
};

export default StarRating;

import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (ratingsArr) => {
  const total = ratingsArr.reduce((acc, el) => acc + el.star, 0);
  const length = ratingsArr.length;
  const avg = total / length;

  return (
    <div className="text-center pt-1 pb-3">
      <span>
        <StarRating 
          rating={avg} 
          starRatedColor='purple'
        />
      </span>
    </div>
  );
}
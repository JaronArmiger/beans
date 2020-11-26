import React from 'react';
import StarRating from 'react-star-ratings';

const Star = ({ starClick, numberOfStars }) => {
  return (
    <React.Fragment>
      <StarRating
        changeRating={() => starClick(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension='20px'
        starSpacing='2px'
        starEmptyColor='purple'
        starHoverColor='purple'
      />
      <br />
    </React.Fragment>
  );
};

export default Star;
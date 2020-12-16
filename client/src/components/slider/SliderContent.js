import React, { useState, useEffect, useRef } from 'react';
import Slide from './Slide';

const SliderContent = ({ width, translate, imageURLs }) => {
  const sliderContentStyle = {
    transform: `translateX(-${translate}px)`,
    transition: `transform ease-out 0.45s`,
    height: '100%',
    width: `${width * imageURLs.length}px`,
    display: 'flex',
  };

  return (
    <React.Fragment>
      <div
        style={sliderContentStyle}
      >
        {imageURLs.map((imageURL, idx) => (
            <Slide 
              key={idx}
              imageURL={imageURL}
              width={width}
            />
          ))}
      </div>
    </React.Fragment>
  );
};

export default SliderContent;
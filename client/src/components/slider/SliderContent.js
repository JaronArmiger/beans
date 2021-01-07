import React from 'react';
import Slide from './Slide';

const SliderContent = ({ 
  width, 
  translate, 
  imageURLs,
  height,
}) => {
  const sliderContentStyle = {
    transform: `translateX(-${translate}px)`,
    transition: `transform ease-out 0.45s`,
    height,
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
              height={height}
            />
          ))}
      </div>
    </React.Fragment>
  );
};

export default SliderContent;
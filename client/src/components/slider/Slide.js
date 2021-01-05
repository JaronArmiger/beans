import React from 'react';

const Slide = ({ imageURL, width, height }) => (
  <div 
    style={{
      height,
      width: `${width}px`,
      backgroundImage: `url(${imageURL})`,
      backgroundSize: 'auto',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  />
);

export default Slide;
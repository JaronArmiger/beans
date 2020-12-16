import React from 'react';

const Slide = ({ imageURL, width }) => (
  <div 
    style={{
      height: '300px',
      width: `${width}px`,
      backgroundImage: `url(${imageURL})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  />
);

export default Slide;
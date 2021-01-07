import React, { useState, useEffect, useRef } from 'react';
import SliderContent from './SliderContent';

const imageURLs = [
  'https://res.cloudinary.com/pilsenvintage/image/upload/v1609978130/pvt-cover1_hvd6pv.jpg',
  'https://res.cloudinary.com/pilsenvintage/image/upload/v1609978129/pvt-cover2_ufyhrw.jpg',
  'https://res.cloudinary.com/pilsenvintage/image/upload/v1609978127/pvt-cover3_hmbfgf.jpg',
];

const Slider = () => {
  const [translate, setTranslate] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const height = '70vh';

  const autoPlayRef = useRef();

  useEffect(() => {
    autoPlayRef.current = nextSlide;
  });

  useEffect(() => {
    const play = () => {
      autoPlayRef.current();
    };

    const interval = setInterval(play, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    if (activeIndex === imageURLs.length - 1) {
      setActiveIndex(0);
      setTranslate(0);
    };
    setActiveIndex(activeIndex === imageURLs.length - 1 ? 0 : activeIndex + 1);
    setTranslate(activeIndex === imageURLs.length - 1 ? 0 : translate + getWidth());
  };

  const getWidth = () => {
    return window.innerWidth;
  };


  return (
    <div
      style={{
        position: 'relative',
        height,
        width: '100%',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      <SliderContent
        width={getWidth()}
        translate={translate}
        imageURLs={imageURLs}
        height={height}
      />
    </div>
  );
};

export default Slider;
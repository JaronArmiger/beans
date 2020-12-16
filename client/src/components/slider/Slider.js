import React, { useState, useEffect, useRef } from 'react';
import SliderContent from './SliderContent';

const imageURLs = [
  'https://images.unsplash.com/photo-1531279550271-23c2a77a765c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80',
  'https://images.unsplash.com/photo-1564106273115-63725b0918ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
  'https://images.unsplash.com/photo-1460899960812-f6ee1ecaf117?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1578309793896-2a825b041f57?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1604&q=80',
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

    const interval = setInterval(play, 2000);

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
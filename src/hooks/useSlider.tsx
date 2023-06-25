import { useRef } from 'react';
import Slider from 'react-slick';

const useSlider = () => {
  const sliderRef = useRef<Slider>(null);

  const slideToNext = () => {
    sliderRef.current?.slickNext();
  };

  const slideToPrev = () => {
    sliderRef.current?.slickPrev();
  };

  return { sliderRef, slideToNext, slideToPrev };
};

export default useSlider;

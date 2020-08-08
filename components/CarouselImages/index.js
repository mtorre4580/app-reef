import React, { useState } from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';

const STYLE_IMG = { width: '100%', height: '300px' };

export default function CarouselImages({ imgs, img }) {
  const imagesToShow = imgs && imgs.length > 0 ? imgs : [img];
  const slides = imagesToShow.map((img) => <img src={img} style={STYLE_IMG} />);
  const [index, setIndex] = useState(0);
  const handleOnChange = (index) => setIndex(index);

  return (
    <>
      <Carousel value={index} slides={slides} onChange={handleOnChange} />
      <Dots value={index} onChange={handleOnChange} number={slides.length} />
    </>
  );
}

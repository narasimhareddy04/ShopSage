import React, { useState } from "react";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/ecommerce-products-laptops-bg.png",
    "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/ecommerce-products-headphones-bg.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnUMT998HrHPHLi8DKgIEOxIQFqv6M_hKUUQ&usqp=CAU",
  ];

  const goToPrevSlide = () => {
    let newIndex = activeIndex - 1;
    if (newIndex < 0) newIndex = images.length - 1;
    setActiveIndex(newIndex);
  };

  const goToNextSlide = () => {
    let newIndex = activeIndex + 1;
    if (newIndex >= images.length) newIndex = 0;
    setActiveIndex(newIndex);
  };

  return (
    <div className="w-3/4 h-96 relative overflow-hidden object-cover">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className={`absolute top-0 left-0 h-80 w-full object-cover transition-transform duration-500 ease-in-out transform ${
            index === activeIndex ? "translate-x-0" : "translate-x-full"
          }`}
        />
      ))}
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-0 p-4 bg-black bg-opacity-50 text-white z-10"
      >
        Prev
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-0 p-4 bg-black bg-opacity-50 text-white z-10"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;

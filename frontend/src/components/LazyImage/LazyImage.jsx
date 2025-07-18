// components/LazyImage.jsx
import React from 'react';

const LazyImage = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
};

export default LazyImage;

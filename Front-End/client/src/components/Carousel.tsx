import React from 'react';
import '../styles/Carousel.css';

type CarouselItem = {
  title: string;
  coverUrl: string;
  description: string;
  rating: number;
};

type CarouselProps = {
  items: CarouselItem[];
};

export default function Carousel({ items }: CarouselProps) {
  return (
    <div className="carousel">
      {items.map((item, index) => (
        <div key={index} className="carousel-item">
          <img src={item.coverUrl} alt={item.title} />
          <div className="carousel-info">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>⭐ {item.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
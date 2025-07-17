import React, { useEffect, useState } from 'react';
import WebtoonList from '../components/WebtoonList';
import '../styles/Catalogue.css';

type Webtoon = {
  title: string;
  coverUrl: string;
  rating: number;
  chapter: number;
  description: string;
};

export default function Catalogue() {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);

  useEffect(() => {
    // API Webtoons
    setWebtoons([
      {
        title: 'Return of the Disaster-Class Hero',
        coverUrl: '/covers/disaster.jpg',
        rating: 9.9,
        chapter: 135,
        description: 'Un héros légendaire revient après une trahison et un long exil.'
      }
    ]);
  }, []);

  return (
    <div className="catalogue">
      <h2>Catalogue</h2>
      <WebtoonList webtoons={webtoons} />
    </div>
  );
}
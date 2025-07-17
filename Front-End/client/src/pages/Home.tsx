import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import WebtoonList from '../components/WebtoonList';
import Sidebar from '../components/Sidebar';
import '../styles/Home.css';

type Webtoon = {
  title: string;
  coverUrl: string;
  rating: number;
  chapter: number;
  description: string;
};

type PopularItem = {
  title: string;
  rating: number;
  genres: string;
};

const Home = () => {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);
  const [popular, setPopular] = useState<PopularItem[]>([]);

  useEffect(() => {
    // Appels API à remplacer
    setWebtoons([
      {
        title: 'Nano Machine',
        coverUrl: '/covers/nano.jpg',
        rating: 9.9,
        chapter: 266,
        description: 'Un jeune homme reçoit une technologie futuriste dans un monde martial.'
      },
      {
        title: 'Pick Me Up',
        coverUrl: '/covers/gacha.jpg',
        rating: 10.0,
        chapter: 157,
        description: 'Un héros piégé dans un jeu de type gacha, avec des enjeux mortels.'
      }
    ]);
    setPopular([
      { title: 'The Great Mage Returns', rating: 9.2, genres: 'Action, Fantasy' },
      { title: 'Nano Machine', rating: 9.9, genres: 'Action, Martial Arts' }
    ]);
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="main-content">
        <Carousel items={webtoons} />
        <div className="content-row">
          <WebtoonList webtoons={webtoons} />
          <Sidebar items={popular} />
        </div>
      </div>
    </div>
  );
};

export default Home;
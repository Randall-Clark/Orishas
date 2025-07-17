import React from 'react';
import WebtoonCard from './WebtoonCard';
import '../styles/WebtoonList.css';

type Webtoon = {
  title: string;
  coverUrl: string;
  rating: number;
  chapter: number;
};

type WebtoonListProps = {
  webtoons: Webtoon[];
};

export default function WebtoonList({ webtoons }: WebtoonListProps) {
  return (
    <div className="webtoon-list">
      {webtoons.map((webtoon, index) => (
        <WebtoonCard
          key={index}
          title={webtoon.title}
          coverUrl={webtoon.coverUrl}
          rating={webtoon.rating}
          chapter={webtoon.chapter}
        />
      ))}
    </div>
  );
}
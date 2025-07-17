import React from 'react';
import '../styles/WebtoonCard.css';

type WebtoonCardProps = {
  title: string;
  coverUrl: string;
  rating: number;
  chapter: number;
};

export default function WebtoonCard({ title, coverUrl, rating, chapter }: WebtoonCardProps) {
  return (
    <div className="webtoon-card">
      <img src={coverUrl} alt={title} className="webtoon-cover" />
      <div className="webtoon-info">
        <h3>{title}</h3>
        <p>Chapter {chapter}</p>
        <p>{rating}</p>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import api from '../api/axios';

type Webtoon = {
  id: string;
  title: string;
  coverUrl: string;
  author: { username: string };
  likes: number;
};

const Home: React.FC = () => {
  const [trending, setTrending] = useState<Webtoon[]>([]);
  const [topWeek, setTopWeek] = useState<Webtoon[]>([]);
  const [topLiked, setTopLiked] = useState<Webtoon[]>([]);
  const [latest, setLatest] = useState<Webtoon[]>([]);

  useEffect(() => {
    api.get('/webtoons/trending').then(res => setTrending(res.data));
    api.get('/webtoons/top-week').then(res => setTopWeek(res.data));
    api.get('/webtoons/top-liked').then(res => setTopLiked(res.data));
    api.get('/webtoons/latest').then(res => setLatest(res.data));
  }, []);

  const renderSection = (title: string, data: Webtoon[]) => (
    <div>
      <h2>{title}</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {data.map(w => (
          <div key={w.id} style={{ width: '150px' }}>
            <img src={w.coverUrl} alt={w.title} style={{ width: '100%' }} />
            <h4>{w.title}</h4>
            <p>{w.author?.username}</p>
            <p>{w.likes} likes</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '1rem' }}>
      {renderSection('🔥 Tendances', trending)}
      {renderSection('📈 Plus lus cette semaine', topWeek)}
      {renderSection('💖 Mieux notés', topLiked)}
      {renderSection('🆕 Nouveaux', latest)}
    </div>
  );
};

export default Home;

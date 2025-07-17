import React from 'react';
import '../styles/Sidebar.css';

type PopularItem = {
  title: string;
  rating: number;
  genres: string;
};

type SidebarProps = {
  items: PopularItem[];
};

export default function Sidebar({ items }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h3>Popular</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="popular-item">
            <strong>{index + 1}. {item.title}</strong>
            <p>{item.genres}</p>
            <span>⭐ {item.rating}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

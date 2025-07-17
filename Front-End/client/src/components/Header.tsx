import React from 'react';
import styles from '../styles/Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>OrishaScan</div>
      <nav>
        <a href="/">Home</a>
        <a href="/bookmarks">Bookmarks</a>
        <a href="/comics">Comics</a>
        <a href="/recruitment">Recruitment</a>
      </nav>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search" />
        <button>🔍</button>
      </div>
      <button className={styles.login}>Login</button>
    </header>
  );
}

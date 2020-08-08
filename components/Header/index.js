import React from 'react';
import styles from './style.module.scss';

export default function Header({ title, children }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </header>
  );
}

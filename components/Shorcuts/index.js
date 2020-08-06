import React from 'react';
import styles from './style.module.scss';

export default function Shorcut({ onClick }) {
  const types = ['SPS', 'LPS', 'SOFT'];
  return (
    <nav className={styles.shorcuts}>
      {types.map((type, index) => (
        <button key={index} className={styles.type} onClick={() => onClick(type)}>
          <h2 className={styles.filter}>{type}</h2>
        </button>
      ))}
    </nav>
  );
}

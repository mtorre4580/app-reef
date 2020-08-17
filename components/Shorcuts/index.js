import React, { useState } from 'react';
import styles from './style.module.scss';

export default function Shorcut({ onClick, filterApplied }) {
  const types = ['SPS', 'LPS', 'SOFT'];
  return (
    <nav className={styles.shorcuts}>
      {types.map((type, index) => (
        <button
          key={index}
          className={`${styles.type} ${filterApplied === type ? styles.active : styles.inactive}`}
          onClick={() => onClick(type)}
        >
          <h2 className={styles.filter}>{type}</h2>
        </button>
      ))}
    </nav>
  );
}

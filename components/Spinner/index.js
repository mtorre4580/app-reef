import React from 'react';
import styles from './style.module.scss';

export default function Spinner({ style }) {
  const items = Array.from(Array(12).keys());
  return (
    <div style={style}>
      <div className={styles.spinner}>
        {items.map((i) => (
          <div className={styles.spin} key={i}></div>
        ))}
      </div>
    </div>
  );
}

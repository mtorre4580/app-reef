import React from 'react';
import styles from './style.module.scss';

export default function Loading({ children }) {
  return (
    <div className={styles.ctn}>
      <div className={styles.ldsCircle}>
        <div></div>
      </div>
      <p>{children}</p>
    </div>
  );
}

import React from 'react';
import styles from './style.module.scss';

export default function FloatButton({ path, children }) {
  return (
    <a href={path} className={styles.floatButton}>
      {children}
    </a>
  );
}

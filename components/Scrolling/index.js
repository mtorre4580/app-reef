import React from 'react';
import styles from './style.module.scss';

export default function Scrolling({ parameters, onClick, selected }) {
  return (
    <nav className={styles.scrolling}>
      {Object.keys(parameters).map((param) => {
        return (
          <div
            className={`${styles.date} ${selected === param ? styles.active : styles.inactive}`}
            key={param}
            onClick={() => onClick(param)}
          >
            {param}
          </div>
        );
      })}
    </nav>
  );
}

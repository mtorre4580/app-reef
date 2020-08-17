import React from 'react';
import styles from './style.module.scss';
import { IconMap, IconList } from '../Icons';

export default function MenuMap({ changeView, t, isMap }) {
  return (
    <nav className={styles.menu}>
      <h2 className={styles.subtitle}>{t('find_near_stores')}</h2>
      <div className={styles.actions}>
        <button onClick={() => changeView('list')}>
          <IconList active={!isMap} color="#3282b8" colorDefault="#212121" />
        </button>
        <button onClick={() => changeView('map')}>
          <IconMap active={isMap} color="#3282b8" colorDefault="#212121" />
        </button>
      </div>
    </nav>
  );
}

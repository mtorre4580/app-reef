import React, { useState } from 'react';
import styles from './style.module.scss';
import MenuDrawer from '../MenuDrawer';
import { IconMenu } from '../Icons';

export default function Header({ title, children, refSection, showDrawer = true }) {
  const [show, setShow] = useState(false);
  const handleDrawer = () => setShow(!show);

  return (
    <header className={styles.header}>
      <nav className={styles.ctn}>
        {showDrawer && (
          <button className={styles.menuAction} onClick={handleDrawer}>
            <IconMenu />
          </button>
        )}
        <h1 className={styles.title}>{title}</h1>
      </nav>
      {children}
      {showDrawer && <MenuDrawer show={show} refSection={refSection} />}
    </header>
  );
}

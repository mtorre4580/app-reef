import React, { useState } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import MenuDrawer from '../MenuDrawer';
import { IconMenu, IconBack } from '../Icons';

export default function Header({ title, children, refSection, showDrawer = true, showBack = null, fixed = true }) {
  const [show, setShow] = useState(false);
  const handleDrawer = () => setShow(!show);

  return (
    <header className={`${styles.header} ${fixed && styles.fixed}`}>
      <nav className={styles.ctn}>
        {showDrawer && (
          <button className={styles.menuAction} onClick={handleDrawer}>
            <IconMenu />
          </button>
        )}
        {showBack && (
          <Link href={showBack.path}>
            <a className={styles.showBack}>
              <IconBack />
            </a>
          </Link>
        )}
        <h1 className={styles.title}>{title}</h1>
      </nav>
      {children}
      {showDrawer && <MenuDrawer show={show} refSection={refSection} />}
    </header>
  );
}

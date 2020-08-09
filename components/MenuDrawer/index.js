import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';

export default function MenuDrawer({ show, refSection }) {
  const ref = useRef();

  const handleClose = () => {
    ref.current.style.width = '0';
    refSection.current.style.marginLeft = '0';
  };

  useEffect(() => {
    if (show) {
      ref.current.style.width = '250px';
      // //refSection.current.style.marginLeft = '250px';
    }
  }, [show]);

  return (
    <div ref={ref} className={styles.sidenav}>
      <button className={styles.closebtn} onClick={handleClose}>
        &times;
      </button>
      <Link href="/home">
        <a>Inicio</a>
      </Link>
      <Link href="/discovery">
        <a>Corales</a>
      </Link>
      <Link href="/stores">
        <a>Locales</a>
      </Link>
      <Link href="/favorites">
        <a>Favoritos</a>
      </Link>
      <Link href="/login">
        <a>Salir</a>
      </Link>
    </div>
  );
}

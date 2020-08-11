import React, { useRef, useEffect, useState } from 'react';
import Router from 'next/router';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { logout } from '../../services/auth';
import Link from 'next/link';
import styles from './style.module.scss';
import Snackbar from '../../components/Snackbar';

export default function MenuDrawer({ show, refSection }) {
  const [showError, setShowError] = useState('');
  const ref = useRef();
  const [user, { mutate }] = useCurrentUser();

  const handleClose = () => {
    ref.current.style.width = '0';
    refSection.current.style.marginLeft = '0';
  };

  const handleLogout = async () => {
    try {
      await logout();
      mutate(null);
      handleClose();
      Router.push('/');
    } catch (err) {
      handleClose();
      setShowError('Se produjo un error al desloguear');
    }
  };

  useEffect(() => {
    if (show) {
      ref.current.style.width = '250px';
    }
  }, [show]);

  return (
    <>
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
        {user && (
          <>
            <Link href="/favorites">
              <a>Favoritos</a>
            </Link>
            <button className={styles.logout} onClick={handleLogout}>
              <a>Salir</a>
            </button>
          </>
        )}
        {!user && (
          <Link href="/login">
            <a>Acceder</a>
          </Link>
        )}
      </div>
      {showError && <Snackbar onClose={() => setShowError('')}>{showError}</Snackbar>}
    </>
  );
}

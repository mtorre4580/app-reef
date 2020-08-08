import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';

export default function Snackbar({ children, onClose }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      onClose();
    }, 3000);
  });

  return <div className={`${styles.snackbar} ${show ? styles.show : styles.show}`}>{children}</div>;
}

import React, { useState } from 'react';
import styles from './style.module.scss';

export default function FormAuth({ onSubmit, t }) {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleOnChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSubmit(user);
  };

  return (
    <form className={styles.formAuth} onSubmit={handleOnSubmit}>
      <input
        className={styles.form}
        type="email"
        placeholder="email"
        name="email"
        onChange={handleOnChange}
        value={user.email}
      />
      <input
        className={styles.form}
        type="password"
        placeholder="password"
        name="password"
        onChange={handleOnChange}
        value={user.password}
      />
      <button className={`${styles.form} ${styles.formBtn}`}>{t('login')}</button>
    </form>
  );
}

import React, { useState } from 'react';
import styles from './style.module.scss';

export default function SearchBox({ onSubmit, onClear, t }) {
  const [input, setInput] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(input);
  };

  const handleOnClear = () => {
    setInput('');
    onClear();
  };

  return (
    <section className={styles.searchBox}>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          placeholder={t('placeholder_search')}
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />
      </form>
      {input && (
        <button className={styles.clear} onClick={handleOnClear}>
          {t('cancel')}
        </button>
      )}
    </section>
  );
}

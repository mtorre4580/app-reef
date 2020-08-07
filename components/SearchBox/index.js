import React, { useState } from 'react';
import styles from './style.module.scss';

export default function SearchBox({ onSubmit, onClear }) {
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
    <nav className={styles.searchBox}>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          placeholder="What coral are you looking for"
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />
      </form>
      {input && (
        <button className={styles.clear} onClick={handleOnClear}>
          Cancel
        </button>
      )}
    </nav>
  );
}

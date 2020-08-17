import React, { useState } from 'react';
import styles from './style.module.scss';

export default function FormEditParam({ parameter, onCancel, onClick, t }) {
  const [value, setValue] = useState(parameter.value);

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    onClick({ ...parameter, value });
  };

  const handleOnChangeEdit = (event) => setValue(event.target.value);

  return (
    <>
      <h2 className={styles.title}>{parameter.type}</h2>
      <form onSubmit={handleSubmitEdit} className={styles.formEditParam}>
        <input type="text" value={value} onChange={handleOnChangeEdit} className={styles.input} />
        <div className={styles.ctn}>
          <button type="button" onClick={onCancel} className={styles.btn}>
            {t('cancel')}
          </button>
          <button type="submit" className={styles.btn}>
            {t('accept')}
          </button>
        </div>
      </form>
    </>
  );
}

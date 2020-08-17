import React from 'react';
import styles from './style.module.scss';

export default function ListParameters({ parameters, onClick }) {
  const handleOnClick = (param, value) => {
    onClick(param, value);
  };

  return (
    <>
      <p className={styles.hint}>Puedes modificar el valor si haces tap en la medición</p>
      <ol className={styles.listParameters}>
        {Object.keys(parameters).map((param) => {
          return (
            <li key={param} onClick={() => handleOnClick(param, parameters[param])}>
              <div className={styles.item}>
                <p className={styles.value}>{param}</p>
                <div>{parameters[param]}</div>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}

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
        {Object.keys(parameters)
          .filter((param) => parameters[param] !== null)
          .map((param) => {
            return (
              <li className={styles.item} key={param} onClick={() => handleOnClick(param, parameters[param])}>
                <p className={styles.value}>{param}</p>
                <div className={styles.cant}>{parameters[param]}</div>
              </li>
            );
          })}
      </ol>
    </>
  );
}

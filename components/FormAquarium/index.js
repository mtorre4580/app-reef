import React, { useState } from 'react';
import styles from './style.module.scss';

export default function FormAquarium({ onSubmit }) {
  const types = ['SPS', 'LPS', 'MIX'];
  const [form, setForm] = useState({ name: '', type: '' });

  const handleOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <>
      <p className={styles.hint}>Una vez que registres tu acuario, podrás tener una trazabilidad de tus parámetros</p>
      <form className={styles.formAquarium} onSubmit={handleSubmit}>
        <input
          className={styles.form}
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleOnChange}
          value={form.name}
        />
        <select className={styles.form} onChange={handleOnChange} name="type" value={form.type}>
          {types.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button className={styles.btn}>Registrar</button>
      </form>
    </>
  );
}

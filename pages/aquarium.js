import React, { createRef, useState } from 'react';
import { withTranslation } from '../i18n';
import Header from '../components/Header';
import styles from '../styles/aquarium.module.scss';

function Aquarium({ t }) {
  const ref = createRef();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const paramsAquarium = {
    ca: 420,
    mg: 1430,
    po4: 0,
    kh: 7.2,
    temp: 26,
    salinity: 1026,
    ph: 8,
    no3: 5,
  };

  const [parametros, setParametros] = useState(paramsAquarium);
  const [editParam, setEditParam] = useState(null);
  const [currentValue, setCurrentValue] = useState(null);

  const handleOnClick = (param, value) => {
    setEditParam({ type: param, value });
    setCurrentValue({ type: param, value });
  };

  const handleOnChangeEdit = (event) => {
    setCurrentValue({ type: currentValue.type, value: event.target.value });
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    setParametros({ ...parametros, [currentValue.type]: currentValue.value });
    setEditParam(null);
  };

  return (
    <section className={styles.aquarium} ref={ref}>
      <Header title={t('aquarium')} refSection={ref} />
      <div>
        {/* sin registrar acuario */}
        {/* <h2 className={styles.title}>Mi Acuario</h2>
        <form className={styles.register} onSubmit={handleSubmit}>
          <input className={styles.form} type="text" name="name" placeholder="Nombre" />
          <select className={styles.form}>
            <option value="SPS">SPS</option>
            <option value="LPS">LPS</option>
            <option value="MIX">Mixto</option>
          </select>
          <button className={styles.btn}>Registrar</button>
        </form>
        <p className={styles.hint}>Una vez que registres tu acuario, podrás tener una trazabilidad de tus parámetros</p> */}
        {/* sin registrar acuario */}

        {/* con el acuario cargado */}
        {!editParam && (
          <>
            <h2 className={styles.title}>Parámetros</h2>
            <h3 style={{ textAlign: 'center', margin: '10px' }}>Última medición 22-08-2020</h3>
            <ol style={{ padding: '20px', listStyle: 'none' }}>
              {Object.keys(parametros).map((param, value) => {
                return (
                  <li key={param} onClick={() => handleOnClick(param, parametros[param])}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '20px',
                        margin: '10px 0',
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: '700', color: '#212121', textTransform: 'capitalize' }}>{param}</p>
                      </div>
                      <div>{parametros[param]}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </>
        )}
        {/* con el acuario cargado */}

        {editParam && (
          <div>
            <h2 className={styles.title} style={{ textTransform: 'uppercase' }}>
              {editParam.type}
            </h2>
            <form onSubmit={handleSubmitEdit} style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
              <input
                type="text"
                value={currentValue.value}
                onChange={handleOnChangeEdit}
                style={{
                  maxWidth: '300px',
                  padding: '10px',
                  borderRadius: '20px',
                  border: '0',
                  backgroundColor: '#f5f5f5',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
                <button
                  type="button"
                  onClick={() => setEditParam(null)}
                  style={{
                    borderRadius: '20px',
                    backgroundColor: '#9c27b0',
                    color: '#fff',
                    fontWeight: '700',
                    border: '0',
                    padding: '10px',
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    borderRadius: '20px',
                    backgroundColor: '#9c27b0',
                    color: '#fff',
                    fontWeight: '700',
                    border: '0',
                    padding: '10px',
                  }}
                >
                  Aceptar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

Aquarium.getInitialProps = async () => ({
  namespacesRequired: ['aquarium'],
});

export default withTranslation('aquarium')(Aquarium);

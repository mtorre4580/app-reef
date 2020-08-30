import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { formatDate } from '../../services/dates';
import es from 'date-fns/locale/es';
import Scrolling from '../Scrolling';
import { IconClose } from '../Icons';
import styles from './style.module.scss';

registerLocale('es', es);

const defaultValues = {
  ca: null,
  mg: null,
  po4: null,
  kh: null,
  temp: null,
  salinity: null,
  ph: null,
  no3: null,
};

export default function FormParam({ onSubmit, t }) {
  const [startDate, setStartDate] = useState(new Date());
  const [parametersRegister, setParametersRegister] = useState(defaultValues);
  const isEmpty = Object.keys(parametersRegister).every((param) => parametersRegister[param] === null);

  const handleOnSubmit = () => {
    event.preventDefault();
    const valor = window.confirm(t('confirm_param'));
    if (valor) {
      onSubmit({
        params: parametersRegister,
        date: formatDate(startDate),
      });
    }
  };

  const handleCancelParam = (param) => {
    setParametersRegister({
      ...parametersRegister,
      [param]: null,
    });
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setParametersRegister({
      ...parametersRegister,
      [name]: parseFloat(value),
    });
  };

  const handleCancel = () => {
    setParametersRegister({
      ca: null,
      mg: null,
      po4: null,
      kh: null,
      temp: null,
      salinity: null,
      ph: null,
      no3: null,
    });
  };

  const handleClickParameter = (type) => {
    setParametersRegister({
      ...parametersRegister,
      [type]: '',
    });
  };

  return (
    <div className={styles.ctn}>
      <h2 className={styles.titleForm}>{t('pick_date')}</h2>
      <DatePicker
        className={styles.datePicker}
        dateFormat="dd/MM/YYY"
        locale="es"
        selected={startDate}
        withPortal
        onChange={(date) => setStartDate(date)}
      />
      <h2 className={styles.titleForm}>{t('pick_params')}</h2>
      <Scrolling onClick={handleClickParameter} parameters={parametersRegister} />
      <form onSubmit={handleOnSubmit} className={styles.form}>
        {Object.keys(parametersRegister).map((param, index) => {
          const val = parametersRegister[param];
          if (val !== null) {
            return (
              <div key={index} className={styles.ctnForm}>
                <div>
                  <label className={styles.labelInputParam} htmlFor={param}>
                    {param}
                  </label>
                  <button className={styles.btnCancel} onClick={() => handleCancelParam(param)}>
                    <IconClose color="#212121" />
                  </button>
                </div>
                <input
                  onChange={handleOnChange}
                  type="text"
                  name={param}
                  id={param}
                  value={parametersRegister[param]}
                  className={styles.inputParam}
                />
              </div>
            );
          }
        })}
        {isEmpty && <p className={styles.emptyForm}>{t('empty_params')}</p>}
        {!isEmpty && (
          <div className={styles.ctnActions}>
            <button className={styles.btn} onClick={handleCancel}>
              {t('cancel')}
            </button>
            <button className={styles.btn}> {t('accept')}</button>
          </div>
        )}
      </form>
    </div>
  );
}

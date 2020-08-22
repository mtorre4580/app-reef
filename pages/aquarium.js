import React, { createRef, useState } from 'react';
import styles from '../styles/aquarium.module.scss';
import { withTranslation } from '../i18n';
import { getAquarium, registerAquarium, updateParameter } from '../services/aquariums';
import { IconAdd } from '../components/Icons';
import Header from '../components/Header';
import FormAquarium from '../components/FormAquarium';
import ListParameters from '../components/ListParameters';
import FormEditParam from '../components/FormEditParam';
import Snackbar from '../components/Snackbar';
import FloatButton from '../components/FloatButton';
import Scrolling from '../components/Scrolling';
import Metrics from '../components/Metrics';

function Aquarium({ t, _id, name, type, parameters }) {
  const ref = createRef();
  const [userAquarium, setUserAquarium] = useState({ name, type });
  const [lastDate] = Object.keys(parameters || {});
  const [lastMeasure, setLastMeasure] = useState(lastDate);
  const [parametersUser, setParametersUser] = useState(lastMeasure ? parameters[lastMeasure] : {});
  const [editParam, setEditParam] = useState(null);
  const [showError, setShowError] = useState('');
  const hasAquarium = userAquarium.name && userAquarium.type;

  const handleSubmitRegister = async (data) => {
    try {
      await registerAquarium(data);
      setUserAquarium({ ...userAquarium, ...data });
      setShowError('');
    } catch (err) {
      setShowError(t('error_register_aquarium'));
    }
  };

  const handleEditParameter = (param, value) => setEditParam({ type: param, value });

  const handleUpdateParameter = async (param) => {
    setEditParam(null);
    try {
      await updateParameter(_id, lastMeasure, param);
      setParametersUser({ ...parametersUser, [param.type]: param.value });
      setShowError('');
    } catch (err) {
      setShowError(t('error_update_parameter'));
    }
  };

  const handleOnClickDate = (param) => {
    setLastMeasure(param);
    setParametersUser(parameters[param]);
  };

  return (
    <section className={styles.aquarium} ref={ref}>
      <Header title={t('aquarium')} refSection={ref} />
      <div className={styles.ctn}>
        {!hasAquarium && <FormAquarium onSubmit={handleSubmitRegister} />}
        {!editParam && hasAquarium && (
          <>
            {lastMeasure && (
              <>
                <Scrolling parameters={parameters} onClick={handleOnClickDate} selected={lastMeasure} />
                <h3 className={styles.measure}>Medición: {lastMeasure}</h3>
                <ListParameters parameters={parametersUser} onClick={handleEditParameter} />
                <Metrics parameters={parameters} />
              </>
            )}
            {!lastMeasure && <p className={styles.title}>{t('empty_parameters')}</p>}
          </>
        )}
        {editParam && hasAquarium && (
          <FormEditParam
            t={t}
            parameter={editParam}
            onCancel={() => setEditParam(null)}
            onClick={handleUpdateParameter}
          />
        )}
        {hasAquarium && (
          <FloatButton path="/parameters">
            <IconAdd className={styles.add} />
          </FloatButton>
        )}
        {showError && <Snackbar onClose={() => setShowError('')}>{showError}</Snackbar>}
      </div>
    </section>
  );
}

export async function getServerSideProps() {
  try {
    const response = await getAquarium();
    return {
      props: {
        ...response,
        namespacesRequired: ['aquarium'],
      },
    };
  } catch (err) {
    return {
      props: {
        namespacesRequired: ['aquarium'],
      },
    };
  }
}

export default withTranslation('aquarium')(Aquarium);

import styles from '../styles/stores.module.scss';
import { useState, createRef } from 'react';
import { withTranslation } from '../i18n';
import Header from '../components/Header';
import StoresMap from '../components/StoresMap';
import MenuMap from '../components/MenuMap';
import ListMap from '../components/ListMap';

function Stores({ t }) {
  const ref = createRef();
  const [selectedView, setSelectedView] = useState('list');
  const handleChangeView = (type) => setSelectedView(type);
  const isMap = selectedView === 'map';

  return (
    <section className={styles.stores} ref={ref}>
      <Header title={t('stores')} refSection={ref}>
        <MenuMap changeView={handleChangeView} t={t} isMap={isMap} />
      </Header>
      {!isMap && <ListMap t={t} />}
      <StoresMap showMap={isMap} t={t} />
    </section>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      namespacesRequired: ['stores'],
    },
  };
}

export default withTranslation('stores')(Stores);

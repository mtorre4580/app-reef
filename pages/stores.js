import styles from '../styles/stores.module.scss';
import { withTranslation } from '../i18n';
import { usePosition } from '../hooks/usePosition';
import Header from '../components/Header';
import StoresMap from '../components/StoresMap';

function Stores({ t }) {
  const { latitude, longitude, error } = usePosition(true);

  return (
    <section className={styles.stores}>
      <Header title={t('stores')}>
        <h2 className={styles.subtitle}>{t('find_near_stores')}</h2>
      </Header>
      {error && <p>{t('error_map')}</p>}
      {latitude && longitude && <StoresMap lat={latitude} lng={longitude} />}
    </section>
  );
}

Stores.getInitialProps = async () => ({
  namespacesRequired: ['stores'],
});

export default withTranslation('stores')(Stores);

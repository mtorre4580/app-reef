import styles from '../styles/stores.module.scss';
import { usePosition } from '../hooks/usePosition';
import Header from '../components/Header';
import StoresMap from '../components/StoresMap';

function Stores() {
  const { latitude, longitude, error } = usePosition(true);

  return (
    <section className={styles.stores}>
      <Header title="Stores">
        <h2 className={styles.subtitle}>Find the nearest stores</h2>
      </Header>
      {error && <p>There was an error loading the map</p>}
      {latitude && longitude && <StoresMap lat={latitude} lng={longitude} />}
    </section>
  );
}

export default Stores;

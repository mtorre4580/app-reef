import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import Snackbar from '../../components/Snackbar';
import styles from './style.module.scss';
import { getAll } from '../../services/stores';

export default function ListMap({ t }) {
  const [showError, setShowError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stores, setStores] = useState([]);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      const results = await getAll();
      setIsLoading(false);
      setStores(results);
    } catch (err) {
      setShowError(t('error_results'));
      setIsLoading(false);
      setStores([]);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <section className={styles.listMap}>
      {stores.length === 0 && !isLoading && <p>{t('no_results')}</p>}
      {stores.map((store, index) => {
        return (
          <article className={styles.store} key={index}>
            <h2 className={styles.title}>{store.name}</h2>
            <a href={store.web}>
              <img src={store.logo} />
            </a>
            <p className={styles.info}>{store.address}</p>
            <a className={styles.call} href={`tel://${store.phone}`}>
              {t('contact')}
            </a>
          </article>
        );
      })}
      {isLoading && <Loading>{t('loading_results')}</Loading>}
      {!isLoading && showError && <Snackbar onClose={() => setShowError('')}>{showError}</Snackbar>}
    </section>
  );
}

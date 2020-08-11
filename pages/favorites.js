import Head from 'next/head';
import { createRef } from 'react';
import { getAll } from '../services/favorites';
import { withTranslation } from '../i18n';
import Header from '../components/Header';
import CoralItem from '../components/CoralItem';
import styles from '../styles/favorites.module.scss';

function Favorites({ favorites = [], t }) {
  const ref = createRef();

  return (
    <>
      <Head>
        <title>{t('favorites')}</title>
      </Head>
      <section ref={ref}>
        <Header title={t('favorites')} refSection={ref} />
        <div>
          {favorites.map((favorite) => (
            <CoralItem key={favorite._id} item={favorite} t={t} />
          ))}
          {favorites.length === 0 && <p className={styles.noFavorites}>{t('no_favorites')}</p>}
        </div>
      </section>
    </>
  );
}

Favorites.getInitialProps = async (ctx) => {
  try {
    const favorites = await getAll();
    return {
      favorites,
      namespacesRequired: ['discovery', 'favorites'],
    };
  } catch (err) {
    return {
      props: null,
    };
  }
};

export default withTranslation('favorites')(Favorites);

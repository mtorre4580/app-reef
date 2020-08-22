import Head from 'next/head';
import { createRef, useState } from 'react';
import { getAll, addFavorite } from '../services/favorites';
import { withTranslation } from '../i18n';
import Header from '../components/Header';
import CoralItem from '../components/CoralItem';
import styles from '../styles/favorites.module.scss';

function Favorites({ favorites = [], t }) {
  const ref = createRef();
  const [items, setItems] = useState(favorites);

  const handleFavorite = async (id) => {
    try {
      await addFavorite(id);
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {}
  };

  return (
    <>
      <Head>
        <title>{t('favorites')}</title>
      </Head>
      <section ref={ref}>
        <Header title={t('favorites')} refSection={ref} />
        <ol className={styles.listFavorites}>
          {items.map((item) => (
            <CoralItem key={item._id} item={item} t={t} onAddFavorite={handleFavorite} />
          ))}
        </ol>
        {items.length === 0 && <p className={styles.noFavorites}>{t('no_favorites')}</p>}
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

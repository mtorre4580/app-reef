import Head from 'next/head';
import { useRouter } from 'next/router';
import { createRef, useState, useEffect } from 'react';
import { getAll, addFavorite } from '../services/favorites';
import { withTranslation } from '../i18n';
import Header from '../components/Header';
import CoralItem from '../components/CoralItem';
import styles from '../styles/favorites.module.scss';

function Favorites({ favorites = [], t, statusError }) {
  const ref = createRef();
  const router = useRouter();
  const [items, setItems] = useState(favorites);

  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    if (isClient && statusError === 401) {
      router.push('/login');
    }
  });

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

export async function getServerSideProps(ctx) {
  try {
    const cookies = ctx.req.headers.cookie;
    const favorites = await getAll(cookies);
    return {
      props: {
        favorites,
        namespacesRequired: ['discovery', 'favorites'],
      },
    };
  } catch (err) {
    return {
      props: {
        statusError: err.response.status,
        namespacesRequired: ['aquarium'],
      },
    };
  }
}

export default withTranslation('favorites')(Favorites);
